/* eslint-disable react/prop-types */
import { useState } from "react";
import ConsultantAddDataBank from "./ConsultantAddDataBank";
import HeaderForm from "../../components/Form/HeaderForm";

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

  const { consultantBank } = consultantInformation.data;

  if (consultantBank) {
    const informationDataBank = [
      {
        title: "Número de cuenta o clabe interbancaria:",
        icon: "card-outline",
        data: consultantBank.account,
      },
      {
        title: "Institución bancaria:",
        icon: "business-outline",
        data: consultantBank.bank,
      },
      {
        title: "Nombre del derechohabiente:",
        icon: "person-outline",
        data: consultantBank.name,
      },
      {
        title: "RFC:",
        icon: "id-card-outline",
        data: consultantBank.RFC,
      },
      {
        title: "País de residencia:",
        icon: "earth-outline",
        data: consultantBank.country,
      },
      {
        title: "Domicilio fiscal:",
        icon: "location-outline",
        data: consultantBank.address,
      },
    ];
    return (
      <>
        {updateDataBank ? (
          <ConsultantAddDataBank
            {...bankProps}
            consultantBank={consultantBank}
          />
        ) : (
          <div
            className="Main__Form DataBank"
            style={{
              backgroundColor: "transparent",
            }}
          >
            <HeaderForm
              title="Tú Informacion Bancaria. 📑"
              imgUrl={"./TarjetaBancaria.png"}
            />
            {informationDataBank.map(({ title, icon, data }, index) => (
              <>
                <p className="Main__Form--TitleInput">{title}</p>
                <div className="Main__Form--ContainerInputs" key={index}>
                  <span className="Main__Form--Inputs--Icon">
                    <ion-icon name={icon}></ion-icon>
                  </span>
                  <input
                    type="text"
                    className="Main__Form--Inputs AddDataBank"
                    value={data}
                    disabled
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "var(--MainPurple)",
                    }}
                  />
                </div>
              </>
            ))}
            <button
              onClick={() => setUpdateDataBank(true)}
              className="Main__Form--ButtonSubmit"
            >
              Editar
            </button>
          </div>
        )}
      </>
    );
  } else {
    return <ConsultantAddDataBank {...bankProps} />;
  }
}
