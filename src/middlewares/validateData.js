export const validateData = (data) => (req, res, next) => {
  try {
    data.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.errors.map((error) => error.message),
    });
  }
};
