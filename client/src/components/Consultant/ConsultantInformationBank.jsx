/* eslint-disable react/prop-types */
import { useState } from "react";
import ConsultantAddDataBank from "./ConsultantAddDataBank";

export default function ConsultantInformationBank({
  consultantInformation,
  setCheckCV,
  checkCV,
}) {
  const [updateDataBank, setUpdateDataBank] = useState(false);

  const bankProps = {
    updateDataBank,
    setUpdateDataBank,
    setCheckCV,
    checkCV,
  };

  const classForm = updateDataBank
    ? "Main__Consultant__Profile--CV--FormLayout Show"
    : "Main__Consultant__Profile--CV--FormLayout";

  const { consultantBank } = consultantInformation.data;

  if (consultantBank) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span>
          <b>Número de cuenta o clabe interbancaria:</b>
          <p>{consultantBank.account}</p>
        </span>
        <span>
          <b>Institución bancaria:</b>
          <p>{consultantBank.bank}</p>
        </span>
        <span>
          <b>Nombre del derechohabiente:</b>
          <p>{consultantBank.name}</p>
        </span>
        <span>
          <b>RFC:</b>
          <p>{consultantBank.RFC}</p>
        </span>
        <span>
          <b>País de residencia:</b>
          <p>{consultantBank.country}</p>
        </span>
        <span>
          <b>Domicilio fiscal:</b>
          <p>{consultantBank.address}</p>
        </span>
        <button onClick={() => setUpdateDataBank(true)}>
          <ion-icon name="color-wand-outline"></ion-icon>
        </button>
        <div className={classForm}>
          <button onClick={() => setUpdateDataBank(false)}>
            Cerrar formulario
          </button>
          <ConsultantAddDataBank
            {...bankProps}
            consultantBank={consultantBank}
          />
        </div>
      </div>
    );
  } else {
    return <ConsultantAddDataBank {...bankProps} />;
  }
}
