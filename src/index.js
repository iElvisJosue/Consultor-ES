import app from "./app.js";
// IMPORTAMOS CONFIGURACIÓN DE BD
import { connectDB } from "./db.js";

// NOS CONECTAMOS A LA DB
connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
