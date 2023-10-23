/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import TituloDeLaSeccion from "../global/TituloDeLaSeccion";
import SinInformacion from "../global/SinInformacion";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteInformacionConsultoresDisponibles.css";

export default function PerfilDelClienteInformacionConsultoresDisponibles({
  consultants,
  setElementID,
}) {
  const showConsultantCV = (id) => {
    setElementID(id);
  };

  const amountConsultants = consultants.flat(Infinity).length;
  if (amountConsultants > 0) {
    return (
      <div className="Main__Profile__Information--Content--ConsultantsAvailable">
        <TituloDeLaSeccion editable={false}>
          Consultores Disponibles: {amountConsultants} ✨
        </TituloDeLaSeccion>
        {consultants.map((dataConsultant) =>
          dataConsultant.map(
            ({ consultantInformation, nameProject }, index) => (
              <div
                className="Main__Profile__Information--Content--ConsultantsAvailable--Container"
                key={index}
              >
                <span className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Project">
                  <p className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Project--Name">
                    ¡Buenas noticias! 🎉 Tenemos este consultor disponible para
                    tu proyecto <i>¡{nameProject}!</i>
                  </p>
                </span>
                <div className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Details">
                  <figure className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Details--Picture">
                    <img
                      // src={
                      //   consultantInformation.pictureConsultant
                      //     ? `http://localhost:4000/usersPictures/${consultantInformation.pictureConsultant}`
                      //     :  "./CEO.png"
                      // }
                      src={
                        consultantInformation.pictureConsultant
                          ? `https://consultor-es.onrender.com/usersPictures/${consultantInformation.pictureConsultant}`
                          : "./CEO.png"
                      }
                      alt="Foto Del Consultor"
                    />
                  </figure>
                  <div className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Details--Info">
                    <p className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Details--Name">
                      {`${consultantInformation.nameConsultant} ${consultantInformation.lastNameConsultant} ${consultantInformation.motherLastNameConsultant}`}
                    </p>
                    <p className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Details--Area">
                      <strong>👨‍🔧 Profesión: </strong>
                      {consultantInformation.professionConsultant}
                    </p>
                    <p className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Details--Time">
                      <strong>📃 Resumen Profesional: </strong>{" "}
                      {consultantInformation.descriptionConsultant}
                    </p>
                    <p className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Details--Payment">
                      <strong>📲 Número: </strong>{" "}
                      {consultantInformation.numberConsultant}
                    </p>
                  </div>
                </div>
                <span className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Button">
                  <button
                    onClick={() =>
                      showConsultantCV(consultantInformation.ownerID)
                    }
                  >
                    Ver Curriculum
                  </button>
                </span>
              </div>
            )
          )
        )}
      </div>
    );
  } else {
    return (
      <SinInformacion>
        ¡No tenemos consultores disponibles para ti, ¡Disculpa las molestias!
      </SinInformacion>
    );
  }
}
