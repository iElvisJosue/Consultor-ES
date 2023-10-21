/* eslint-disable react/prop-types */

// COMPONENTES A USAR
import SubtituloDeLaSeccion from "../global/SubtituloDeLaSeccion";
import TextoDeLaSeccion from "../global/TextoDeLaSeccion";

// AYUDAS
import { formatPayment } from "../../../helpers/FormatoDePago";
import { dateCreate, dateLastUpdate } from "../../../helpers/FormatoDeFecha";

export default function PerfilDelClienteInformacionProyectosLista({
  index,
  project,
  changeMenu,
  setElementID,
  setShowModalDelete,
  setShowModalComplete,
  setTypeElementDelete,
  filter,
}) {
  const {
    _id,
    nameProject,
    detailsProject,
    areaProject,
    timeProject,
    paymentProject,
    createdAt,
    updatedAt,
  } = project;
  const commonPropsProjectsList = {
    changeMenu,
    setShowModalDelete,
    setShowModalComplete,
    setTypeElementDelete,
    setElementID,
    title: false,
    nameMenu: "ProyectosEditar",
  };
  return (
    <>
      {filter === "Activos" ? (
        <SubtituloDeLaSeccion id={_id} {...commonPropsProjectsList}>
          Proyecto {index} 🗃️
        </SubtituloDeLaSeccion>
      ) : (
        <SubtituloDeLaSeccion
          completed={false}
          editable={false}
          deleted={false}
          {...commonPropsProjectsList}
        >
          Proyecto {index} 🗃️
        </SubtituloDeLaSeccion>
      )}

      <TextoDeLaSeccion title="💼 Nombre:" text={nameProject} />
      <TextoDeLaSeccion title="📝 Detalles:" text={detailsProject} />
      <TextoDeLaSeccion title="🛠️ Área:" text={areaProject} />
      <TextoDeLaSeccion title="🕰️ Tiempo:" text={timeProject} />
      <TextoDeLaSeccion title="💰 Pago:" text={formatPayment(paymentProject)} />
      {filter === "Activos" ? (
        <TextoDeLaSeccion title="📅 Creado:" text={dateCreate(createdAt)} />
      ) : (
        <TextoDeLaSeccion
          title="📅 Completado:"
          text={dateLastUpdate(updatedAt)}
        />
      )}
      <hr
        style={{
          width: "100%",
          height: 1,
          marginTop: 10,
          border: "none",
          background: "var(--SecondaryPurple)",
        }}
      />
    </>
  );
}
