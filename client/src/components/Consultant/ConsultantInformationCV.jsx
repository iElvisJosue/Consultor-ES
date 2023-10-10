/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  getInfoExperienceCV,
  getInfoStudiesCV,
  getInfoAreasCV,
  getInfoLanguagesCV,
  getInfoSkillsCV,
} from "../../helpers/consultantFunctions";
import ConsultantAddArea from "./ConsultantAddArea";
import ConsultantAddExperience from "./ConsultantAddExperience";
import ConsultantAddStudy from "./ConsultantAddStudy";
import ConsultantAddLanguage from "./ConsultantAddLanguage";
import ConsultantAddSkill from "./ConsultantAddSkill";
import ConsultantUpdateResume from "./ConsultantUpdateResume";
import { useConsultant } from "../../context/ConsultantContext";
import { handleResponseMessages } from "../../helpers/globalFunctions";

export default function ConsultantInformationCV({
  email,
  consultantInformation,
  setCheckCV,
  checkCV,
}) {
  const [seeForm, setSeeForm] = useState(false);
  const [addForm, setAddForm] = useState(null);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState(null);
  const {
    deleteExperience,
    deleteStudy,
    deleteArea,
    deleteLanguage,
    deleteSkill,
  } = useConsultant();

  const seeFormConsultant = (data) => {
    setUpdate(false);
    setId(null);
    setAddForm(data);
    setSeeForm(!seeForm);
  };
  const setUpdateConfig = (data, id) => {
    setId(id);
    setUpdate(true);
    setAddForm(data);
    setSeeForm(!seeForm);
  };
  const handleDelete = async (id, deleteSection) => {
    try {
      const res = await deleteSection(id);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
      }
      setCheckCV(!checkCV);
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const {
    consultantResume,
    consultantExperience,
    consultantEducation,
    consultantAreas,
    consultantLanguages,
    consultantSkills,
  } = consultantInformation.data;

  const experience = getInfoExperienceCV(
    consultantExperience,
    setUpdateConfig,
    handleDelete,
    deleteExperience
  );
  const education = getInfoStudiesCV(
    consultantEducation,
    setUpdateConfig,
    handleDelete,
    deleteStudy
  );
  const areas = getInfoAreasCV(consultantAreas, handleDelete, deleteArea);
  const languages = getInfoLanguagesCV(
    consultantLanguages,
    handleDelete,
    deleteLanguage
  );
  const skills = getInfoSkillsCV(consultantSkills, handleDelete, deleteSkill);

  const formProps = {
    setSeeForm,
    setCheckCV,
    checkCV,
    setUpdate,
    update,
    setId,
    id,
    consultantInformation,
  };

  const listForms = {
    addExperience: (
      <ConsultantAddExperience
        {...formProps}
        consultantExperience={consultantExperience}
      />
    ),
    addStudy: (
      <ConsultantAddStudy
        {...formProps}
        consultantEducation={consultantEducation}
      />
    ),
    addArea: <ConsultantAddArea {...formProps} />,
    addLanguage: <ConsultantAddLanguage {...formProps} />,
    addSkill: <ConsultantAddSkill {...formProps} />,
    updateResume: (
      <ConsultantUpdateResume
        {...formProps}
        consultantResume={consultantResume}
      />
    ),
  };

  return (
    <>
      {seeForm ? (
        listForms[addForm]
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: 75,
          }}
        >
          <div className="Main__Consultant__Profile--Header">
            <h2>Información personal</h2>
            <br />
            <picture>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
                alt="Esta es mi foto"
                style={{
                  width: "125px",
                  height: "125px",
                  borderRadius: "50%",
                }}
              />
            </picture>
            <span className="Main__Consultant__Profile--Header--Information">
              <p className="Main__Consultant__Profile--Header--Information--Name">
                {`${consultantInformation.data.consultantInformation.name} ${consultantInformation.data.consultantInformation.lastName} ${consultantInformation.data.consultantInformation.motherLastName}`}
              </p>
              <p className="Main__Consultant__Profile--Header--Information--Email">
                <ion-icon name="mail-outline"></ion-icon> {email}
              </p>
              <p className="Main__Consultant__Profile--Header--Information--Number">
                <ion-icon name="call-outline"></ion-icon>{" "}
                {`${consultantInformation.data.consultantInformation.number}`}
              </p>
              {consultantInformation.data.consultantInformation.LinkedIn && (
                <a
                  href={
                    consultantInformation.data.consultantInformation.LinkedIn
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <ion-icon name="logo-linkedin"></ion-icon> Perfil LinkedIn
                </a>
              )}
            </span>
          </div>
          <br />
          <hr />
          <br />
          <div className="Main__Consultant__Profile--Resume">
            <h2>
              <ion-icon name="reader-outline"></ion-icon> Resumen profesional
            </h2>
            <br />
            <p>{consultantResume.profession}</p>
            <p>{consultantResume.description}</p>
            <button
              onClick={() => {
                setUpdateConfig(
                  "updateResume",
                  consultantInformation.data.consultantInformation.ownerID
                );
              }}
            >
              <ion-icon name="color-wand-outline"></ion-icon>
            </button>
          </div>
          <br />
          <hr />
          <br />
          <div className="Main__Consultant__Profile--Experience">
            <h2>
              <ion-icon name="business-outline"></ion-icon> Mi experiencia
              profesional
            </h2>
            <br />
            {experience}
            <button onClick={() => seeFormConsultant("addExperience")}>
              Agregar experiencia
            </button>
          </div>
          <br />
          <hr />
          <br />
          <div className="Main__Consultant__Profile--Studies">
            <h2>
              <ion-icon name="school-outline"></ion-icon> Mi estudios
            </h2>
            <br />
            {education}
            <button onClick={() => seeFormConsultant("addStudy")}>
              Agregar estudios
            </button>
          </div>
          <br />
          <hr />
          <br />
          <div className="Main__Consultant__Profile--Areas">
            <h2>
              <ion-icon name="medal-outline"></ion-icon> Areas de conocimiento
            </h2>
            <br />
            <p>{areas}</p>
            <br />
            <button onClick={() => seeFormConsultant("addArea")}>
              Agregar areas
            </button>
          </div>
          <br />
          <hr />
          <br />
          <div className="Main__Consultant__Profile--Languages">
            <h2>
              <ion-icon name="language-outline"></ion-icon> Idiomas
            </h2>
            <br />
            <p>{languages}</p>
            <br />
            <button onClick={() => seeFormConsultant("addLanguage")}>
              Agregar idioma
            </button>
          </div>
          <br />
          <hr />
          <br />
          <div className="Main__Consultant__Profile--Skills">
            <h2>
              <ion-icon name="construct-outline"></ion-icon> Habilidades
            </h2>
            <br />
            <p>{skills}</p>
            <br />
            <button onClick={() => seeFormConsultant("addSkill")}>
              Agregar habilidad
            </button>
          </div>
        </div>
      )}
    </>
  );
}
