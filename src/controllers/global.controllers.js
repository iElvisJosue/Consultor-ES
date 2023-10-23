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

const error500 =
  "Lo sentimos, se ha producido un error interno en el servidor. Nuestro equipo técnico ha sido notificado y está trabajando para resolverlo lo más rápido posible. Por favor, inténtalo de nuevo más tarde.";

const EMAIL_TEMPLATES = {
  Consultor: {
    subject: "¡Bienvenido a Consultor-ES!",
  },
  Cliente: {
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
          path: "./src/public/EmailHeader.jpg",
          cid: "EmailHeader",
        },
        {
          filename: "EmailFooter.jpg",
          path: "./src/public/EmailFooter.jpg",
          cid: "EmailFooter",
        },
      ],
    });
    console.log("CORREO ENVIADO");
  } catch (error) {
    console.log(error);
    console.log("HUBO UN ERROR AL ENVIAR EL CORREO");
  }
};
const registerAndSendVerificationCode = async (res, email, role) => {
  try {
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

    const user = {
      _id: newUserModelSaved._id,
      email: newUserModelSaved.email,
      userName: newUserModelSaved.userName,
      role: newUserModelSaved.role,
      knowUs: newUserModelSaved.knowUs,
      online: newUserModelSaved.online,
    };

    // CREAMOS EL ID EN UN TOKEN
    const accessToken = await createAccessToken(user);

    // ALMACENAMOS EL TOKEN EN UN COOKIE
    res.cookie("accessToken", accessToken, {
      maxAge: 24 * 60 * 60 * 1000, // UN DIA
      secure: true,
      sameSite: "none",
    });
    const responseObject = {
      accessToken: accessToken,
      user,
    };
    res.send(responseObject);
    sendEmail(newUserModelSaved.email, code, role);
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const sendEmailVerificationCode = async (req, res) => {
  try {
    const { email, role } = req.body;

    // VERIFICAMOS SI EXISTE EL CORREO
    const emailFound = await userModel.findOne({ email });

    if (!emailFound) {
      registerAndSendVerificationCode(res, email, role);
    } else if (
      emailFound &&
      emailFound.emailVerified === true &&
      emailFound.userName !== ""
    ) {
      res
        .status(302)
        .json(
          "El correo introducido ya ha sido verificado, por favor, inténtalo de nuevo con otro correo o inicia sesión con tu cuenta."
        );
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
  } catch (error) {
    res
      .status(500)
      .json(
        "Lo sentimos, se ha producido un error interno en el servidor. Nuestro equipo técnico ha sido notificado y está trabajando para resolverlo lo más rápido posible. Por favor, inténtalo de nuevo más tarde."
      );
  }
};
export const emailVerification = async (req, res) => {
  try {
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

      const userData = {
        _id: updatedEmailVerification._id,
        email: updatedEmailVerification.email,
        userName: updatedEmailVerification.userName,
        role: updatedEmailVerification.role,
        knowUs: updatedEmailVerification.knowUs,
        online: updatedEmailVerification.online,
      };

      // CREAMOS EL ID EN UN TOKEN
      const accessToken = await createAccessToken(userData);

      // ALMACENAMOS EL TOKEN EN UN COOKIE
      res.cookie("accessToken", accessToken, {
        maxAge: 24 * 60 * 60 * 1000, // UN DIA
      });

      res.send(userData);
    } else {
      res
        .status(400)
        .json(
          "El código que has ingresado no es válido. Por favor, asegúrate de introducir el código correcto y vuelve a intentarlo."
        );
    }
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const updateUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const userFound = await userModel.findOne({
      $and: [{ userName }, { _id: { $ne: req.user._id } }],
    });

    if (!userFound) {
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
      res.status(200).json("El usuario ha sido actualizado.");
    } else {
      res
        .status(302)
        .json(
          "El nombre de usuario ingresado ya existe, por favor, inténtalo con otro nombre."
        );
    }
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const updateUserImage = async (req, res) => {
  try {
    console.log(req.file);
    res.status(200).json("¡Tu imagen ha sido actualizada correctamente!.");
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const login = async (req, res) => {
  try {
    // OBTENEMOS LOS DATOS INGRESAMOS POR EL USUARIO
    const { yourUserName, yourPassword } = req.body;

    // BUSCAMOS SI EL USUARIO EXISTE
    const userFound = await userModel.findOne({
      userName: yourUserName,
    });

    if (userFound) {
      // COMPARAMOS EL NOMBRE ENCRIPTADO CON EL NOMBRE DEL USUARIO
      const isMatch = await bcrypt.compare(yourPassword, userFound.password);
      if (isMatch) {
        const userSessionInfo = await startSession(req, res, userFound._id);

        // CREAMOS EL ID EN UN TOKEN DEL USUARIO ENCONTRADO
        const accessToken = await createAccessToken(userSessionInfo);
        // ALMACENAMOS EL TOKEN EN UN COOKIE
        res.cookie("accessToken", accessToken, {
          secure: true,
          sameSite: "none",
        });

        const responseObject = {
          accessToken: accessToken,
          user: userSessionInfo,
        };

        res.status(200).json(responseObject);
      } else {
        res
          .status(404)
          .json(
            "Lo sentimos, las credenciales proporcionadas no son correctas. Por favor, verifica tu nombre de usuario y contraseña e inténtalo de nuevo."
          );
      }
    } else {
      res
        .status(404)
        .json(
          "Lo sentimos, las credenciales proporcionadas no son correctas. Por favor, verifica tu nombre de usuario y contraseña e inténtalo de nuevo."
        );
    }
  } catch (error) {
    res.status(500).json(error500);
  }
};
const startSession = async (req, res, id) => {
  try {
    const userSession = await userModel.findByIdAndUpdate(
      id,
      {
        online: true,
      },
      {
        new: true,
      }
    );

    return {
      _id: userSession._id,
      email: userSession.email,
      userName: userSession.userName,
      role: userSession.role,
      knowUs: userSession.knowUs,
      online: userSession.online,
    };
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const userInformation = await userModel.findById(req.user._id);

    res.send({
      _id: userInformation._id,
      email: userInformation.email,
      userName: userInformation.userName,
      role: userInformation.role,
      knowUs: userInformation.knowUs,
      online: userInformation.online,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error500);
  }
};
export const logout = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.body.id, {
      online: false,
    });
    res.cookie("accessToken", "", {
      expires: new Date(0),
    });
    res.send("SESIÓN FINALIZADA");
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const verifyToken = async (req, res) => {
  const { accessToken } = req.cookies;

  jwt.verify(accessToken, TOKEN_SECRET, async (err, user) => {
    if (err) {
      console.log("HUBO UN ERROR Y ES:", err);
      return res.status(400).json(["TU TOKEN NO ESTA AUTORIZADO"]);
    }
    return res.json(user);
  });
};
