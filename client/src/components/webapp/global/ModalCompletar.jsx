/* eslint-disable react/prop-types */

// HOOKS A USAR
import useProjectComplete from "../../../hooks/cliente/useProjectComplete";

export default function ModalCompletar({
  setShowModalComplete,
  classModalComplete,
  setElementID,
  elementID,
  setCheckClient,
  checkClient,
}) {
  const { completeProject } = useProjectComplete({
    setElementID,
    setCheckClient,
    checkClient,
  });

  const completeElement = () => {
    completeProject(elementID);
    closeModalComplete();
  };

  const closeModalComplete = () => {
    setShowModalComplete(false);
    setElementID(null);
  };
  return (
    <div className={classModalComplete}>
      <div className="Main__Modal--Content">
        <p className="Main__Modal--Content--Title Complete">
          COMPLETAR PROYECTO
        </p>
        <picture className="Main__Modal--Content--Picture">
          <img src="./Completar.png" alt="Completar El Proyecto" />
        </picture>
        <p className="Main__Modal--Content--Description">
          ¡Estás a punto de marcar este proyecto como completado! Asegúrate de
          que todos los objetivos se han alcanzado antes de continuar. ¿Estás
          seguro de que deseas completar el proyecto?
        </p>
        <span className="Main__Modal--Content--Buttons">
          <button
            className="Main__Modal--Content--Buttons--Cancel Complete"
            onClick={closeModalComplete}
          >
            Cancelar
          </button>
          <button
            className="Main__Modal--Content--Buttons--Confirm Complete"
            onClick={completeElement}
          >
            Completar
          </button>
        </span>
      </div>
    </div>
  );
}
