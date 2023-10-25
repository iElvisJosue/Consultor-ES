import userModel from "../models/users.model.js";
export const isAdmin = async (req, res, next) => {
  const { role } = await userModel.findById(req.user._id);
  if (role === "Administrador") return next();
  // TODO: MANDARLO AL HOMEPAGE
  res
    .status(400)
    .json("Para acceder a esta ruta, necesitas ser un Administrador.");
};
