/* eslint-disable react/prop-types */
// ESTILOS A USAR
import "../../../styles/webapp/SinInformacion.css";
export default function SinInformacion({ children }) {
  return (
    <div className="Main__WithoutInfo">
      <picture className="Main__WithoutInfo--Picture">
        <img src="./SinInformacion.png" alt="Sin información" />
      </picture>
      <p className="Main__WithoutInfo--Text">{children}</p>
    </div>
  );
}
