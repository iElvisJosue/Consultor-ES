/* eslint-disable react/prop-types */
export default function ConsultantInformationCV({
  email,
  consultantInformation,
}) {
  return (
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
          {consultantInformation.data.resumeCV.profession}
        </p>
        <p>
          <ion-icon name="reader-outline"></ion-icon>
          {consultantInformation.data.resumeCV.description}
        </p>
      </div>
      <br />
      <hr />
      <br />
      <div className="Main__Consultant__Profile--Experience">
        <h2>Mi experiencia profesional</h2>
        <br />
        {Object.values(consultantInformation.data.experienceCV).map(
          ({ position, company, resume, startDate, endDate }, index) => {
            return (
              <div
                key={index}
                style={{
                  marginBottom: "20px",
                }}
              >
                <p>
                  <ion-icon name="accessibility-outline"></ion-icon> {position}
                </p>
                <p>
                  <ion-icon name="business-outline"></ion-icon> {company}
                </p>
                <p>
                  <ion-icon name="reader-outline"></ion-icon> {resume}
                </p>
                <p>
                  <ion-icon name="calendar-outline"></ion-icon> {startDate} -{" "}
                  {endDate}
                </p>
              </div>
            );
          }
        )}
      </div>
      <br />
      <hr />
      <br />
      <div className="Main__Consultant__Profile--Studies">
        <h2>Mi estudios</h2>
        <br />
        <p>
          <ion-icon name="school-outline"></ion-icon>{" "}
          {consultantInformation.data.educationCV.educationLevel}
        </p>
        <p>
          <ion-icon name="file-tray-full-outline"></ion-icon>{" "}
          {consultantInformation.data.educationCV.institution}
        </p>
        <p>
          <ion-icon name="file-tray-full-outline"></ion-icon>{" "}
          {consultantInformation.data.educationCV.area}
        </p>
        <p>
          <ion-icon name="calendar-outline"></ion-icon>{" "}
          {`${consultantInformation.data.educationCV.startDate} - ${consultantInformation.data.educationCV.endDate}`}
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
          {Object.values(consultantInformation.data.areasCV).map(
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
          )}
        </p>
      </div>
    </>
  );
}
