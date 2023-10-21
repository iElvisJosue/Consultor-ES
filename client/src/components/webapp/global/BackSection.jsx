/* eslint-disable react/prop-types */
// ESTILOS A USAR
import "../../../styles/webapp/BackSection.css";

/* 
children -> Es el texto que se debe mostrar
changeMenu -> Cambia el menu en la interfaz (En este caso siempre será a CV)
setElementID -> Cambia el ID del elemento seleccionado
backButton -> Si se debe mostrar el botón de volver
title -> Título que se debe mostrar
imgUrl -> Url de la imagen que se debe mostrar
imgAlt -> Descripción de la imagen
*/

export default function BackSection({
  children,
  changeMenu,
  setElementID,
  nameMenu = "CV",
  backButton = true,
  title = false,
  imgUrl = false,
  imgAlt = "Descripción de la imagen",
}) {
  const changeMenuAndID = () => {
    changeMenu(nameMenu);
    setElementID(null);
  };

  return (
    <header className="Main__Form--BackSection">
      {backButton && (
        <button
          className="Main__Form--BackSection--Button"
          onClick={changeMenuAndID}
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
          {children}
        </button>
      )}
      {imgUrl && (
        <img
          src={imgUrl}
          alt={imgAlt}
          className="Main__Form--BackSection--Img"
        />
      )}
      {title && <h2 className="Main__Form--BackSection--Title">{title}</h2>}
      <hr className="Main__Form--BackSection--Divisor" />
    </header>
  );
}
