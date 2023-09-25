// OBTENER INFORMACIÓN DE EXPERIENCIA DE CV
export const getInfoExperienceCV = (
  consultantInformation,
  setUpdateConfig,
  deleteExperienceConsultant
) => {
  const experienceContent = consultantInformation.data.experienceCV
    ? Object.values(consultantInformation.data.experienceCV).map(
        ({ _id, position, company, resume, startDate, endDate }, index) => {
          return (
            <div
              key={index}
              style={{
                marginBottom: "20px",
              }}
            >
              <p>{position}</p>
              <p>{company}</p>
              <p>{resume}</p>
              <p>
                {startDate} - {endDate}
              </p>
              <button
                onClick={() => {
                  deleteExperienceConsultant(_id);
                }}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
              <button
                onClick={() => {
                  setUpdateConfig("addExperience", _id);
                }}
              >
                <ion-icon name="color-wand-outline"></ion-icon>
              </button>
            </div>
          );
        }
      )
    : "No hay experiencia";

  return experienceContent;
};

// OBTENER INFORMACIÓN DE ESTUDIOS DE CV
export const getInfoStudiesCV = (
  consultantInformation,
  setUpdateConfig,
  deleteEducationConsultant
) => {
  const educationContent = consultantInformation.data.educationCV
    ? Object.values(consultantInformation.data.educationCV).map(
        (
          { _id, institution, educationLevel, area, startDate, endDate },
          index
        ) => {
          return (
            <div
              key={index}
              style={{
                marginBottom: "20px",
              }}
            >
              <p>{institution}</p>
              <p>{educationLevel}</p>
              <p>{area}</p>
              <p>
                {startDate} - {endDate}
              </p>
              <button
                onClick={() => {
                  deleteEducationConsultant(_id);
                }}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
              <button
                onClick={() => {
                  setUpdateConfig("addStudy", _id);
                }}
              >
                <ion-icon name="color-wand-outline"></ion-icon>
              </button>
            </div>
          );
        }
      )
    : "No hay educación";

  return educationContent;
};

// OBTENER INFORMACIÓN DE LAS AREAS DE CV
export const getInfoAreasCV = (consultantInformation, deleteAreaConsultant) => {
  const areasContent = consultantInformation.data.areasCV
    ? Object.values(consultantInformation.data.areasCV).map(
        ({ _id, nameArea }, index) => {
          return (
            <span style={{ marginRight: "10px" }} key={index}>
              {nameArea}
              <button
                onClick={() => {
                  deleteAreaConsultant(_id);
                }}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </span>
          );
        }
      )
    : "No hay areas";

  return areasContent;
};

// OBTENER INFORMACIÓN DE LOS IDIOMAS DE CV
export const getInfoLanguagesCV = (
  consultantInformation,
  deleteLanguageConsultant
) => {
  const languagesContent = consultantInformation.data.languagesCV
    ? Object.values(consultantInformation.data.languagesCV).map(
        ({ _id, nameLanguage, levelLanguage }, index) => {
          return (
            <span style={{ marginRight: "10px" }} key={index}>
              {nameLanguage} - {levelLanguage}
              <button
                onClick={() => {
                  deleteLanguageConsultant(_id);
                }}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </span>
          );
        }
      )
    : "No hay idiomas";

  return languagesContent;
};

// OBTENER INFORMACIÓN DE LOS SKILLS DE CV
export const getInfoSkillsCV = (
  consultantInformation,
  deleteSkillConsultant
) => {
  const skillsContent = consultantInformation.data.skillsCV
    ? Object.values(consultantInformation.data.skillsCV).map(
        ({ _id, nameSkill }, index) => {
          return (
            <span style={{ marginRight: "10px" }} key={index}>
              {nameSkill}
              <button
                onClick={() => {
                  deleteSkillConsultant(_id);
                }}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </span>
          );
        }
      )
    : "No hay habilidades";

  return skillsContent;
};
