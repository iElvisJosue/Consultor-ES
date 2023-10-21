/* eslint-disable react/prop-types */

// AYUDAS A USAR
// import { formatText } from "../../../helpers/formatText

// ESTILOS A USAR
import "../../../styles/webapp/TextoDeLaSeccion.css";

export default function TextoDeLaSeccion({
  title = "Titulo de la sección:",
  text,
}) {
  // PENDIENTE..
  // const newText = formatText(text);

  return (
    <p className="Main__Profile__Information--TextSection">
      <strong>{title}</strong> {text}
    </p>
  );
}
