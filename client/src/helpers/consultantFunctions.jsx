// OBTENER INFORMACIÓN DE EXPERIENCIA DE CV
export const getInfoExperienceCV = (
  consultantExperience,
  setUpdateConfig,
  handleDelete,
  deleteExperience
) => {
  if (consultantExperience.length > 0) {
    const experienceContent = consultantExperience.map(
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
                handleDelete(_id, deleteExperience);
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
  consultantEducation,
  setUpdateConfig,
  handleDelete,
  deleteStudy
) => {
  if (consultantEducation.length > 0) {
    const educationContent = consultantEducation.map(
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
                handleDelete(_id, deleteStudy);
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
export const getInfoAreasCV = (consultantAreas, handleDelete, deleteArea) => {
  if (consultantAreas.length > 0) {
    const areasContent = consultantAreas.map(({ _id, nameArea }, index) => {
      return (
        <span style={{ marginRight: "10px" }} key={index}>
          {nameArea}
          <button
            onClick={() => {
              handleDelete(_id, deleteArea);
            }}
          >
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </span>
      );
    });
    return areasContent;
  }
  return "No hay areas";
};
// OBTENER INFORMACIÓN DE LOS IDIOMAS DE CV
export const getInfoLanguagesCV = (
  consultantLanguages,
  handleDelete,
  deleteLanguage
) => {
  if (consultantLanguages.length > 0) {
    const languagesContent = consultantLanguages.map(
      ({ _id, nameLanguage, levelLanguage }, index) => {
        return (
          <span style={{ marginRight: "10px" }} key={index}>
            {nameLanguage} - {levelLanguage}
            <button
              onClick={() => {
                handleDelete(_id, deleteLanguage);
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
  consultantSkills,
  handleDelete,
  deleteSkill
) => {
  if (consultantSkills.length > 0) {
    const skillsContent = consultantSkills.map(({ _id, nameSkill }, index) => {
      return (
        <span style={{ marginRight: "10px" }} key={index}>
          {nameSkill}
          <button
            onClick={() => {
              handleDelete(_id, deleteSkill);
            }}
          >
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </span>
      );
    });
    return skillsContent;
  }
  return "No hay skills";
};
