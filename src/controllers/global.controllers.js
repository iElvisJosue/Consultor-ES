// LIBRERÍA DE TOKENS
import { createAccessToken } from "../libs/jwt.js";
// IMPORTAMOS EL TRANSPORTER DEL NODEMAILER
import transporter from "../helpers/sendEmail.cjs";
//IMPORTAMOS EL MODELO DE USUARIOS
import userModel from "../models/users.model.js";
// IMPORTAMOS LOS TEMPLATES PARA LOS EMAILS
import { templateCodeVerification } from "../helpers/templateEmail.js";
// LIBRERÍA PARA ENCRIPTAR
import bcrypt from "bcryptjs";
// IMPORTAMOS JWT
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

const EMAIL_TEMPLATES = {
  Consultant: {
    subject: "¡Bienvenido a Consultor-ES!",
  },
  Client: {
    subject: "¡Ya puedes disponer de el mejor talento Senior",
  },
};
const generateCode = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};

const sendEmail = async (toEmail, code, role) => {
  const nameFromEmail = toEmail.split("@")[0];

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: toEmail,
      subject: `${EMAIL_TEMPLATES[role].subject}`,
      html: templateCodeVerification(nameFromEmail, code, role),
      attachments: [
        {
          filename: "EmailHeader.jpg",
          path: "./public/EmailHeader.jpg",
          cid: "EmailHeader",
        },
        {
          filename: "EmailFooter.jpg",
          path: "./public/EmailFooter.jpg",
          cid: "EmailFooter",
        },
      ],
    });
    console.log("CORREO ENVIADO EXITOSAMENTE");
  } catch (error) {
    console.log("HUBO UN ERROR ENVIANDO EL CORREO");
    return error;
  }
};

const registerAndSendVerificationCode = async (res, email, role) => {
  // OBTENEMOS UN CÓDIGO DE VERIFICACIÓN
  const code = generateCode();
  // INSTANCIAS EL ESQUEMA Y LO ALMACENAMOS
  const newUserModel = new userModel({
    email,
    emailCode: code,
    role,
  });

  // GUARDAMOS EL CORREO EN LA BD Y LO ALMACENAMOS EN UNA CONSTANTE
  const newUserModelSaved = await newUserModel.save();

  // CREAMOS EL ID EN UN TOKEN
  const accessToken = await createAccessToken({
    _id: newUserModelSaved._id,
  });

  // ALMACENAMOS EL TOKEN EN UN COOKIE
  res.cookie("accessToken", accessToken, {
    maxAge: 24 * 60 * 60 * 1000, // UN DIA
    secure: true,
    sameSite: "none",
  });

  const responseObject = {
    accessToken: accessToken,
    user: newUserModelSaved,
  };

  // VEMOS LOS DATOS
  res.send(responseObject);

  // ENVIAMOS EL CORREO DEPENDIENDO EL ROLE
  sendEmail(newUserModelSaved.email, code, role);
};

export const sendEmailVerificationCode = async (req, res) => {
  const { email, role } = req.body;

  // VERIFICAMOS SI EXISTE EL CORREO
  const emailFound = await userModel.findOne({ email });

  if (!emailFound) {
    try {
      registerAndSendVerificationCode(res, email, role);
    } catch (error) {
      // TODO: SOLUCIONAR ESTO
      res.status(500).json(["ERROR"]);
    }
  } else if (
    emailFound &&
    emailFound.emailVerified === true &&
    emailFound.userName !== ""
  ) {
    res.status(400).json(["VERIFICADO"]);
  } else if (
    emailFound &&
    emailFound.emailVerified === true &&
    emailFound.userName === ""
  ) {
    await userModel.deleteOne({ email });
    registerAndSendVerificationCode(res, email, role);
  } else if (emailFound && emailFound.emailVerified === false) {
    await userModel.deleteOne({ email });
    registerAndSendVerificationCode(res, email, role);
  }
};

export const emailVerification = async (req, res) => {
  const { codeEntered } = req.body;
  const { emailCode } = await userModel.findById(req.user._id);

  if (codeEntered === emailCode) {
    const updatedEmailVerification = await userModel.findByIdAndUpdate(
      req.user._id,
      { emailVerified: true },
      {
        new: true,
      }
    );

    // CREAMOS EL ID EN UN TOKEN
    const accessToken = await createAccessToken({
      _id: updatedEmailVerification._id,
    });

    // ALMACENAMOS EL TOKEN EN UN COOKIE
    res.cookie("accessToken", accessToken, {
      maxAge: 24 * 60 * 60 * 1000, // UN DIA
    });

    res.send(updatedEmailVerification);
  } else {
    res.status(400).json(["INCORRECTO"]);
  }
};

export const updateUser = async (req, res) => {
  const { userName, password } = req.body;

  const userFound = await userModel.findOne({
    $and: [{ userName }, { _id: { $ne: req.user._id } }],
  });

  if (!userFound) {
    try {
      // ENCRIPTAMOS LA CONTRASEÑA
      const encryptedPassword = await bcrypt.hash(password, 10);

      await userModel.findByIdAndUpdate(
        req.user._id,
        {
          userName,
          password: encryptedPassword,
        },
        {
          new: true,
        }
      );

      res.status(200).json(["ACTUALIZADO"]);
    } catch (error) {
      console.log(error);
      res.status(400).json(["ERROR"]);
    }
  } else {
    res.status(400).json(["EXISTENTE"]);
  }
};

export const verifyToken = async (req, res) => {
  const { accessToken } = req.cookies;

  console.log("MI TOKEN DE ACCESO ES:", accessToken);

  jwt.verify(accessToken, TOKEN_SECRET, async (err, user) => {
    if (err) {
      console.log("HUBO UN ERROR Y ES:", err);
      return res.status(400).json(["TU TOKEN NO ESTA AUTORIZADO"]);
    }
    console.log("NO HUBO ERROR");
    return res.json(user);
  });
};

export const login = async (req, res) => {
  // OBTENEMOS LOS DATOS INGRESAMOS POR EL USUARIO
  const { yourUserName, yourPassword } = req.body;

  // BUSCAMOS SI EL USUARIO EXISTE
  const userFound = await userModel.findOne({
    userName: yourUserName,
  });

  if (userFound) {
    try {
      // COMPARAMOS EL NOMBRE ENCRIPTADO CON EL NOMBRE DEL USUARIO
      const isMatch = await bcrypt.compare(yourPassword, userFound.password);
      if (isMatch) {
        // CREAMOS EL ID EN UN TOKEN DEL USUARIO ENCONTRADO
        const accessToken = await createAccessToken({
          _id: userFound._id,
        });
        // ALMACENAMOS EL TOKEN EN UN COOKIE
        res.cookie("accessToken", accessToken, {
          maxAge: 24 * 60 * 60 * 1000, // UN DIA
          secure: true,
          sameSite: "none",
        });

        const responseObject = {
          accessToken: accessToken,
          user: userFound,
        };

        // VEMOS LOS DATOS
        res.send(responseObject);
      } else {
        res.status(400).json(["INEXISTENTE"]);
      }
    } catch (error) {
      res.status(500).json(["ERROR"]);
    }
  } else {
    res.status(400).json(["INEXISTENTE"]);
  }
};

export const getUserProfile = async (req, res) => {
  console.log(req.user._id);
  try {
    const userRoleFound = await userModel.findById(req.user._id);
    const { role } = userRoleFound;

    res.send({ role });
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR"]);
  }
};

export const logout = (req, res) => {
  // ELIMINAMOS EL TOKEN
  res.cookie("accessToken", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
