import "../../../styles/webapp/ButtonSubmit.css";

/* eslint-disable react/prop-types */

/* 
isDisabled -> Deshabilitada el botón para evitar el multiple envío de datos
addElement -> Muestra el botón que permite agregar elementos en la interface
changeMenu -> Cambia el menu en la interfaz y este depende de "nameMenu"
text -> Texto del botón
*/

export default function ButtonSubmit({
  isDisabled = false,
  addElement = false,
  changeMenu,
  nameMenu,
  text = "Siguiente",
}) {
  const classButtonSubmit = isDisabled
    ? "Main__Form--ButtonSubmit Disabled"
    : "Main__Form--ButtonSubmit";

  return (
    <>
      {addElement ? (
        <button
          type="submit"
          className={classButtonSubmit}
          onClick={() => changeMenu(nameMenu)}
        >
          {text}
        </button>
      ) : (
        <button type="submit" className={classButtonSubmit}>
          {text}
        </button>
      )}
    </>
  );
}
