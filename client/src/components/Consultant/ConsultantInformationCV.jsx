import { useState } from "react";
import ConsultantAddArea from "./ConsultantAddArea";
import ConsultantAddExperience from "./ConsultantAddExperience";
import ConsultantAddStudy from "./ConsultantAddStudy";
import "../../styles/FormsConsultant.css";

/* eslint-disable react/prop-types */
export default function ConsultantInformationCV({
  email,
  consultantInformation,
  setCheckCV,
  checkCV,
}) {
  const [seeForm, setSeeForm] = useState(false);
  const [addForm, setAddForm] = useState(null);

  const classForm = seeForm
    ? "Main__Consultant__Profile--CV--FormLayout Show"
    : "Main__Consultant__Profile--CV--FormLayout";

  const experience = consultantInformation.data.experienceCV
    ? Object.values(consultantInformation.data.experienceCV).map(
        ({ position, company, resume, startDate, endDate }, index) => {
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
            </div>
          );
        }
      )
    : "No hay experiencia";

  const education = consultantInformation.data.educationCV
    ? Object.values(consultantInformation.data.educationCV).map(
        ({ institution, educationLevel, area, startDate, endDate }, index) => {
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
            </div>
          );
        }
      )
    : "No hay educación";

  const areas = consultantInformation.data.areasCV
    ? Object.values(consultantInformation.data.areasCV).map(
        ({ nameArea }, index) => {
          return (
            <span
              style={{ backgroundColor: "lightblue", marginRight: "10px" }}
              key={index}
            >
              {nameArea}
            </span>
          );
        }
      )
    : "No hay areas";

  const seeFormConsultant = (data) => {
    setSeeForm(!seeForm);
    setAddForm(data);
  };

  const listForms = {
    addExperience: (
      <ConsultantAddExperience
        setSeeForm={setSeeForm}
        setCheckCV={setCheckCV}
        checkCV={checkCV}
      />
    ),
    addStudy: (
      <ConsultantAddStudy
        setCheckCV={setCheckCV}
        setSeeForm={setSeeForm}
        checkCV={checkCV}
      />
    ),
    addArea: (
      <ConsultantAddArea
        setCheckCV={setCheckCV}
        setSeeForm={setSeeForm}
        checkCV={checkCV}
      />
    ),
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", position: "relative" }}>
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
        <h2>
          <ion-icon name="reader-outline"></ion-icon> Resumen profesional
        </h2>
        <br />
        <p>{consultantInformation.data.resumeCV.profession}</p>
        <p>{consultantInformation.data.resumeCV.description}</p>
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
      <div className={classForm}>
        <button onClick={seeFormConsultant}>Cerrar formulario</button>
        {listForms[addForm]}
      </div>
    </div>
  );
}
