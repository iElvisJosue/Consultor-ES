/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useClient } from "../../context/ClientContext";
import Loader from "../Loader";

export default function ClientConsultantsAvailable({ clientInformation }) {
  const [searching, setSearching] = useState(true);
  const [consultants, setConsultants] = useState(false);
  const { getConsultantsAvailableForProject } = useClient();

  useEffect(() => {
    async function getConsultantsAvailable() {
      const { projectsClient } = clientInformation;
      if (projectsClient.length > 0) {
        const allAreas = getProjectAreas(projectsClient);
        const res = await getConsultantsAvailableForProject(allAreas);
        if (!res.data[0]) {
          setConsultants(res.data);
        }
      }
      setSearching(false);
    }
    getConsultantsAvailable();
  }, []);

  const getProjectAreas = (projectsClient) => {
    const projectArea = [];
    projectsClient.map(({ areaProject, isCompleted, isDeleted }) => {
      if (!isDeleted && !isCompleted) {
        return projectArea.push({ areaProject });
      }
    });
    return projectArea;
  };

  if (searching) {
    return <Loader />;
  }
  if (consultants) {
    const {
      areaInformation,
      consultantInformation,
      consultantResume,
      consultantExperience,
      consultantEducation,
      consultantLanguages,
      consultantSkills,
    } = consultants;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {consultantInformation.map(
          ({ name, lastName, motherLastName, LinkedIn, number }, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  padding: 20,
                  border: "1px solid black",
                }}
              >
                <b>El consultor: </b>
                <p>
                  {name} {lastName} {motherLastName}
                </p>
                <b>Es una excelente opción para tu proyecto de área: </b>
                <p>{areaInformation[index].nameArea}</p>
                <b>Su profesión es: </b>
                <p>{consultantResume[index].profession}</p>
                <b>Aquí un breve resumen de su perfil: </b>
                <p>{consultantResume[index].description}</p>
                <b>Cuenta con experiencia en: </b>
                {consultantExperience[index].length > 0 ? (
                  consultantExperience[index].map(
                    ({
                      _id,
                      position,
                      company,
                      resume,
                      startDate,
                      endDate,
                    }) => {
                      return (
                        <div key={_id}>
                          <p>
                            <b>Puesto/Cargo de: </b>
                            {position}
                          </p>
                          <p>
                            <b>En la empresa: </b>
                            {company}
                          </p>
                          <p>
                            <b>Realizando las tareas de: </b>
                            {resume}
                          </p>
                          <p>
                            <b>Desde: </b> {startDate}
                            <b> Hasta: </b> {endDate}
                          </p>
                        </div>
                      );
                    }
                  )
                ) : (
                  <p>¡Vaya!, no cuenta con experiencia...</p>
                )}
                <b>Cuenta con estudios en: </b>
                {consultantEducation[index].length > 0 ? (
                  consultantEducation[index].map(
                    ({
                      _id,
                      institution,
                      educationLevel,
                      area,
                      startDate,
                      endDate,
                    }) => {
                      return (
                        <div key={_id}>
                          <p>
                            <b>Institución: </b>
                            {institution}
                          </p>
                          <p>
                            <b>Con el grado de estudio: </b>
                            {educationLevel}
                          </p>
                          <p>
                            <b>En el área de: </b>
                            {area}
                          </p>
                          <p>
                            <b>Desde: </b> {startDate}
                            <b> Hasta: </b> {endDate}
                          </p>
                        </div>
                      );
                    }
                  )
                ) : (
                  <p>¡Vaya!, no cuenta con estudios...</p>
                )}
                <b>El cual habla los siguientes idiomas: </b>
                {consultantLanguages[index].length > 0 ? (
                  consultantLanguages[index].map(
                    ({ _id, nameLanguage, levelLanguage }) => {
                      return (
                        <div key={_id}>
                          <p>
                            <b>Idioma: </b>
                            {nameLanguage}
                          </p>
                          <p>
                            <b>Con un nivel: </b>
                            {levelLanguage}
                          </p>
                        </div>
                      );
                    }
                  )
                ) : (
                  <p>¡Vaya!, no cuenta con idiomas...</p>
                )}
                <b>El cual tiene las siguientes habilidades: </b>
                {consultantSkills[index].length > 0 ? (
                  consultantSkills[index].map(({ _id, nameSkill }) => {
                    return (
                      <div key={_id}>
                        <p>
                          <b>Habilidad en: </b>
                          {nameSkill}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p>¡Vaya!, no cuenta con habilidades...</p>
                )}
                <b>Contactalo vía:</b>
                <span>
                  {LinkedIn && (
                    <a href={LinkedIn} target="_blank" rel="noreferrer">
                      <ion-icon name="logo-linkedin"></ion-icon>
                    </a>
                  )}
                  {number && (
                    <a
                      href={`https://wa.me/${number}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ion-icon
                        name="logo-whatsapp"
                        role="img"
                        class="md hydrated"
                        aria-label="logo whatsapp"
                      ></ion-icon>
                    </a>
                  )}
                </span>
              </div>
            );
          }
        )}
      </div>
    );
  } else {
    return <h1>Sin proyectos no podemos asignar consultores</h1>;
  }
}
