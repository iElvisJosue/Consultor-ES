// OBTENER INFORMACIÓN DE EXPERIENCIA DE CV
export const getInfoExperienceCV = (
  consultantInformation,
  setUpdateConfig,
  deleteExperienceConsultant
) => {
  if (consultantInformation.data.consultantInformation.experienceCV) {
    const experience = Object.values(
      consultantInformation.data.consultantInformation.experienceCV
    );
    const experienceContent = experience.map(
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
    );
    return experienceContent;
  }

  return "No hay experiencia";
};

// OBTENER INFORMACIÓN DE ESTUDIOS DE CV
export const getInfoStudiesCV = (
  consultantInformation,
  setUpdateConfig,
  deleteEducationConsultant
) => {
  if (consultantInformation.data.consultantInformation.educationCV) {
    const education = Object.values(
      consultantInformation.data.consultantInformation.educationCV
    );
    const educationContent = education.map(
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
    );

    return educationContent;
  }

  return "No hay estudios";
};

// OBTENER INFORMACIÓN DE LAS AREAS DE CV
export const getInfoAreasCV = (consultantInformation, deleteAreaConsultant) => {
  const areas = consultantInformation.data.consultantAreas;
  if (areas.length > 0) {
    const areasContent = consultantInformation.data.consultantAreas.map(
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
    );
    return areasContent;
  }
  return "No hay areas";
};

// OBTENER INFORMACIÓN DE LOS IDIOMAS DE CV
export const getInfoLanguagesCV = (
  consultantInformation,
  deleteLanguageConsultant
) => {
  if (consultantInformation.data.consultantInformation.languagesCV) {
    const languages = Object.values(
      consultantInformation.data.consultantInformation.languagesCV
    );
    const languagesContent = languages.map(
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
    );
    return languagesContent;
  }
  return "No hay idiomas";
};

// OBTENER INFORMACIÓN DE LOS SKILLS DE CV
export const getInfoSkillsCV = (
  consultantInformation,
  deleteSkillConsultant
) => {
  if (consultantInformation.data.consultantInformation.skillsCV) {
    const skills = Object.values(
      consultantInformation.data.consultantInformation.skillsCV
    );
    const skillsContent = skills.map(({ _id, nameSkill }, index) => {
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
    });
    return skillsContent;
  }
  return "No hay habilidades";
};
