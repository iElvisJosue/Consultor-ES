/* eslint-disable react/prop-types */

// ESTILOS A USAR
import "../../../styles/webapp/SubtituloDeLaSeccion.css";
export default function SubtituloDeLaSeccion({
  id = "",
  changeMenu,
  nameMenu,
  setElementID,
  setShowModalDelete,
  setShowModalComplete,
  setTypeElementDelete,
  completed = true,
  editable = true,
  deleted = true,
  children,
}) {
  const editElement = () => {
    setElementID(id);
    changeMenu(nameMenu);
  };

  const completeElement = () => {
    setElementID(id);
    setShowModalComplete(true);
  };
  const deleteElement = () => {
    setElementID(id);
    setShowModalDelete(true);
    setTypeElementDelete(nameMenu);
  };

  return (
    <p className="Main__Profile__Information--Subtitle">
      {children}
      <span className="Main__Profile__Information--Subtitle--Container">
        {completed && (
          <button
            className="Main__Profile__Information--Subtitle--Container--Button Complete"
            onClick={completeElement}
          >
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </button>
        )}
        {editable && (
          <button
            className="Main__Profile__Information--Subtitle--Container--Button"
            onClick={editElement}
          >
            <ion-icon name="color-wand-outline"></ion-icon>
          </button>
        )}
        {deleted && (
          <button
            className="Main__Profile__Information--Subtitle--Container--Button Delete"
            onClick={deleteElement}
          >
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        )}
      </span>
    </p>
  );
}
