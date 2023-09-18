import userModel from "../models/users.model.js";
export const emailIsNotVerified = async (req, res, next) => {
  const { emailVerified } = await userModel.findById(req.user._id);
  if (!emailVerified) return next();
  // TODO: MANDARLO AL HOMEPAGE
  res.status(400).json(["VERIFICADO"]);
};

export const emailIsVerified = async (req, res, next) => {
  const { emailVerified } = await userModel.findById(req.user._id);
  if (emailVerified) return next();
  // TODO: MANDARLO A VERIFICAR SU CORREO
  res.status(400).json(["SIN VERIFICAR"]);
};
