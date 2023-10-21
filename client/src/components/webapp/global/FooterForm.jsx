/* eslint-disable react/prop-types */
import "../../../styles/webapp/FooterForm.css";
export default function FooterForm({
  title = "Inserta un título..",
  optionOne = "Opción 1",
  optionTwo = "Opción 2",
}) {
  return (
    <>
      <p className="Main__Form__Footer--Title">{title}</p>
      <span className="Main__Form__Footer--Options">
        <small>
          <a href="/ConsultorVerificacionDeCorreo">{optionOne}</a>
        </small>
        <small>|</small>
        <small>
          <a href="/ClienteVerificacionDeCorreo">{optionTwo}</a>
        </small>
      </span>
    </>
  );
}
