/* eslint-disable react/prop-types */

// ESTILOS A USAR
import "../../../styles/webapp/TituloDeLaSeccion.css";
export default function TituloDeLaSeccion({
  id = "",
  editable = true,
  changeMenu,
  nameMenu,
  setElementID,
  children,
}) {
  const editElement = () => {
    setElementID(id);
    changeMenu(nameMenu);
  };

  return (
    <p className="Main__Profile__Information--TitleSection">
      {children}
      <span className="Main__Profile__Information--TitleSection--Container">
        {editable && (
          <button
            className="Main__Profile__Information--TitleSection--Container--Button"
            onClick={editElement}
          >
            <ion-icon name="color-wand-outline"></ion-icon>
          </button>
        )}
      </span>
    </p>
  );
}
