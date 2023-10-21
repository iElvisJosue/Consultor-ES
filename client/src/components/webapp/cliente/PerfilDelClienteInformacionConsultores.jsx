/* eslint-disable react/prop-types */
// HOOKS A USAR
import useGetConsultants from "../../../hooks/cliente/useGetConsultants";

// COMPONENTES A USAR
import Loader from "../global/Loader";
import TituloDeLaSeccion from "../global/TituloDeLaSeccion";
import SinInformacion from "../global/SinInformacion";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteInformacionConsultores.css";

export default function PerfilDelClienteInformacionConsultores({
  clientInformation,
}) {
  const { searching, consultants } = useGetConsultants({ clientInformation });

  if (searching) {
    return <Loader text="Buscando consultores..." />;
  }
  if (consultants) {
    // console.log(consultants);
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
                console.log(consultantInformation),
                (
                  <div
                    className="Main__Profile__Information--Content--ConsultantsAvailable--Container"
                    key={index}
                  >
                    <span className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Project">
                      <p className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Project--Name">
                        ¡Buenas noticias! 🎉 Tenemos este consultor disponible
                        para tu proyecto <i>¡{nameProject}!</i>
                      </p>
                    </span>
                    <div className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Details">
                      <picture className="Main__Profile__Information--Content--ConsultantsAvailable--Container--Details--Picture">
                        <img
                          src="https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
                          alt="Foto Del Cliente"
                        />
                      </picture>
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
                        onClick={() => alert(consultantInformation.ownerID)}
                      >
                        Ver Curriculum
                      </button>
                    </span>
                  </div>
                )
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
  } else {
    return (
      <SinInformacion>
        ¡Sin proyectos no podemos asignar consultores!
      </SinInformacion>
    );
  }
}
