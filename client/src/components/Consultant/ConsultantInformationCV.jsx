import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Toaster, toast } from "sonner";

/* eslint-disable react/prop-types */
export default function ConsultantInformationCV({
  email,
  consultantInformation,
}) {
  const [cvInformation, setCVInformation] = useState(false);
  const { getConsultantCV } = useAuth();

  const ERROR_MESSAGE = {
    RESUME:
      "Error al obtener los datos del resumen. Por favor intente de nuevo.",
    EXPERIENCE:
      "Error al obtener los datos de la experiencia. Por favor intente de nuevo.",
    STUDIES:
      "Error al obtener los datos de las estudios. Por favor intente de nuevo.",
    AREAS:
      "Error al obtener los datos de las áreas. Por favor intente de nuevo.",
    ERROR: "Error al obtener los datos de tú CV. Por favor intente de nuevo.",
  };

  useEffect(() => {
    async function getConsultantInformationCV() {
      const res = await getConsultantCV();
      setCVInformation(res.data);
      checkResponse(res.data);
    }
    getConsultantInformationCV();
  }, []);

  const checkResponse = (data) => {
    if (data.resume.error) {
      toast.error(ERROR_MESSAGE.RESUME);
    }
    if (data.experience.error) {
      toast.error(ERROR_MESSAGE.EXPERIENCE);
    }
    if (data.studies.error) {
      toast.error(ERROR_MESSAGE.STUDIES);
    }
    if (data.areas.error) {
      toast.error(ERROR_MESSAGE.AREAS);
    }
  };

  return (
    cvInformation && (
      <>
        <h1>MI CURRICULUM</h1>
        <br />
        <hr />
        <br />
        <div className="Main__Consultant__Profile--Header">
          <h2>Información personal</h2>
          <br />
          <picture>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
              alt="Esta es mi foto"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
          </picture>
          <span className="Main__Consultant__Profile--Header--Information">
            <p className="Main__Consultant__Profile--Header--Information--Name">
              {`${consultantInformation.data.name} ${consultantInformation.data.lastName} ${consultantInformation.data.motherLastName}`}
            </p>
            <p className="Main__Consultant__Profile--Header--Information--Email">
              <ion-icon name="mail-outline"></ion-icon> {email}
            </p>
            <p className="Main__Consultant__Profile--Header--Information--Number">
              <ion-icon name="call-outline"></ion-icon>{" "}
              {`${consultantInformation.data.number}`}
            </p>
          </span>
        </div>
        <br />
        <hr />
        <br />
        <div className="Main__Consultant__Profile--Resume">
          <h2>Resumen profesional</h2>
          <br />
          <p>
            <ion-icon name="cafe-outline"></ion-icon>{" "}
            {cvInformation.resume.profession}
          </p>
          <p>
            <ion-icon name="reader-outline"></ion-icon>
            {cvInformation.resume.description}
          </p>
        </div>
        <br />
        <hr />
        <br />
        <div className="Main__Consultant__Profile--Experience">
          <h2>Mi experiencia profesional</h2>
          <br />
          <p>
            <ion-icon name="accessibility-outline"></ion-icon>{" "}
            {cvInformation.experience.position}
          </p>
          <p>
            <ion-icon name="business-outline"></ion-icon>{" "}
            {cvInformation.experience.company}
          </p>
          <p>
            <ion-icon name="reader-outline"></ion-icon>
            {cvInformation.experience.resume}
          </p>
          <p>
            <ion-icon name="calendar-outline"></ion-icon>{" "}
            {`${cvInformation.experience.startDate} - ${cvInformation.experience.endDate}`}
          </p>
        </div>
        <br />
        <hr />
        <br />
        <div className="Main__Consultant__Profile--Studies">
          <h2>Mi estudios</h2>
          <br />
          <p>
            <ion-icon name="school-outline"></ion-icon>{" "}
            {cvInformation.studies.educationLevel}
          </p>
          <p>
            <ion-icon name="file-tray-full-outline"></ion-icon>{" "}
            {cvInformation.studies.institution}
          </p>
          <p>
            <ion-icon name="file-tray-full-outline"></ion-icon>{" "}
            {cvInformation.studies.area}
          </p>
          <p>
            <ion-icon name="calendar-outline"></ion-icon>{" "}
            {`${cvInformation.studies.startDate} - ${cvInformation.studies.endDate}`}
          </p>
        </div>
        <br />
        <hr />
        <br />
        <div className="Main__Consultant__Profile--Areas">
          <h2>Areas de conocimiento</h2>
          <br />
          <p>
            <ion-icon name="medal-outline"></ion-icon>{" "}
            {cvInformation.areas.nameArea}
          </p>
        </div>
        <Toaster richColors position="top-right" />
      </>
    )
  );
}
