/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ConsultantAddDataBank from "./ConsultantAddDataBank";

export default function ConsultantInformationBank({
  consultantInformation,
  setCheckCV,
  checkCV,
}) {
  const [dataBankInformation, setDataBankInformation] = useState(false);

  useEffect(() => {
    if (consultantInformation.data.consultantInformation.dataBank) {
      setDataBankInformation(true);
    }
  }, []);

  return (
    <div className="ConsultantInformationBank">
      <h1>Información bancaria</h1>
      {dataBankInformation ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <span>
            <b>Número de cuenta o clabe interbancaria:</b>
            <p>
              {consultantInformation.data.consultantInformation.dataBank
                ?.account ?? ""}
            </p>
          </span>
          <span>
            <b>Institución bancaria:</b>
            <p>
              {consultantInformation.data.consultantInformation.dataBank
                ?.bank ?? ""}
            </p>
          </span>
          <span>
            <b>Nombre del derechohabiente:</b>
            <p>
              {consultantInformation.data.consultantInformation.dataBank
                ?.name ?? ""}
            </p>
          </span>
          <span>
            <b>RFC:</b>
            <p>
              {consultantInformation.data.consultantInformation.dataBank?.RFC ??
                ""}
            </p>
          </span>
          <span>
            <b>País de residencia:</b>
            <p>
              {consultantInformation.data.consultantInformation.dataBank
                ?.country ?? ""}
            </p>
          </span>
          <span>
            <b>Domicilio fiscal:</b>
            <p>
              {consultantInformation.data.consultantInformation.dataBank
                ?.address ?? ""}
            </p>
          </span>
          <button onClick={() => setDataBankInformation(false)}>
            <ion-icon name="color-wand-outline"></ion-icon>
          </button>
        </div>
      ) : (
        <ConsultantAddDataBank
          bankInformation={
            consultantInformation.data.consultantInformation.dataBank
          }
          setDataBankInformation={setDataBankInformation}
          checkCV={checkCV}
          setCheckCV={setCheckCV}
        />
      )}
    </div>
  );
}
