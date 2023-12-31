import userModel from "../models/users.model.js";
export const emailIsNotVerified = async (req, res, next) => {
  const { emailVerified } = await userModel.findById(req.user._id);
  if (!emailVerified) return next();
  // TODO: MANDARLO AL HOMEPAGE
  res
    .status(400)
    .json(
      "Este correo ya ha sido verificado. Por favor, inicia sesión con tu cuenta."
    );
};

export const emailIsVerified = async (req, res, next) => {
  const { emailVerified } = await userModel.findById(req.user._id);
  if (emailVerified) return next();
  // TODO: MANDARLO A VERIFICAR SU CORREO
  res
    .status(400)
    .json(
      "Tu correo no ha sido verificado, por favor, verifica tu correo e intenta de nuevo."
    );
};
