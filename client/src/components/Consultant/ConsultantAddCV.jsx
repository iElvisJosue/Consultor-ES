import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Toaster, toast } from "sonner";

// eslint-disable-next-line react/prop-types
export default function ConsultantAddCV({ setCheckCV }) {
  const { register, handleSubmit } = useForm();
  const { createResumeCV, updateStatusCV } = useAuth();

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const listOfMonths = months.map((month, index) =>
    index === 0 ? (
      <option key={index} value={month} defaultValue={true}>
        {month}
      </option>
    ) : (
      <option key={index} value={month}>
        {month}
      </option>
    )
  );
  const years = [];
  for (let i = new Date().getFullYear(); i >= 1930; i--) {
    years.push(i);
  }
  const listOfYears = years.map((year, index) =>
    index === 0 ? (
      <option key={index} value={year} defaultValue={true}>
        {year}
      </option>
    ) : (
      <option key={index} value={year}>
        {year}
      </option>
    )
  );
  const specialtiesAreas = [
    "CRM",
    "Diseño de productos, servicios y modelos de negocio (Product owner, Service Design…)",
    "Comercial / Ventas",
    "Customer loyalty y fidelización",
    "Ecommerce y Marketplace",
    "Comunicación y contenidos",
    "Estrategia",
    "Innovación tecnológica (Internet of ThingS, IA, 3d printing, robotics, blockchain….)",
    "Internacionalización",
    "Marca, posicionamiento y comunicación",
    "Market Research / Customer Experience",
    "Marketing Digital y growth hacking",
    "Modelos de gestión / Management",
    "Multicanalidad (Contact Center, atención al cliente…)",
    "Usabilidad (UX / UI)",
    "Sostenibilidad",
    "Automatización y robotización de procesos",
    "Compliance / gestión de riesgos",
    "Data Analytics & Business Intelligence",
    "Desarrolladores (Web y App developer)",
    "Logística y Supply Chain",
    "Operaciones",
    "Project management (PMO, digital project manager…)",
    "Consultoría IT (planes de sistemas, implantación de ERPs...)",
    "Búsqueda de Financiación",
    "Estrategia financiera / Corporate Finance",
    "Innovación en las finanzas a nivel de procesos y de negocio",
    "Refinanciación y Reestructuración",
    "Desarrollo y gestión de liderazgo",
    "Experiencia de empleado",
    "Gestión del cambio y Cultura digital (Agile, Scrum...)",
    "Transformación organizacionalPlan de Igualdad",
    "Transformación digital",
  ];
  const listOfSpecialtiesAreas = specialtiesAreas.map((specialties, index) =>
    index === 0 ? (
      <option key={index} value={specialties} defaultValue={true}>
        {specialties}
      </option>
    ) : (
      <option key={index} value={specialties}>
        {specialties}
      </option>
    )
  );
  const ERROR_MESSAGES = {
    EXISTENTE: "Ya has creado un resumen de tu perfil profesional.",
    SERVER_ERROR:
      "Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.",
  };

  const handleSuccessResponse = async () => {
    try {
      await updateStatusCV();
      toast.success("¡Resumen de tu perfil profesional creado!");
      setTimeout(() => {
        setCheckCV(true);
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error(ERROR_MESSAGES.SERVER_ERROR);
    }
  };

  const handleErrorResponse = (status) => {
    switch (status) {
      case "EXISTENTE":
        toast.error(ERROR_MESSAGES.EXISTENTE);
        break;
      case "ERROR":
        toast.error(ERROR_MESSAGES.SERVER_ERROR);
        break;
      default:
        toast.error(ERROR_MESSAGES.SERVER_ERROR);
    }
  };

  const addResumeCV = handleSubmit(async (data) => {
    const res = await createResumeCV(data);
    if (!res.data) {
      handleErrorResponse(res.response.data[0]);
      return;
    }
    handleSuccessResponse();
  });

  return (
    <main>
      <form onSubmit={addResumeCV}>
        <h1>Resumen de tu perfil profesional</h1>
        <p>Título breve de tu profesión:</p>
        <input type="text" {...register("profession", { required: true })} />
        <p>Descripción breve de tu perfil profesional:</p>
        <input type="text" {...register("description", { required: true })} />
        <h1>Agregar tu experiencia más relevante:</h1>
        <p>Puesto/Cargo:</p>
        <input type="text" {...register("position", { required: true })} />
        <p>Nombre de la empresa:</p>
        <input type="text" {...register("company", { required: true })} />
        <p>Resumen del cargo que desempeñaste:</p>
        <input type="text" {...register("resume", { required: true })} />
        <br />
        <br />
        <p>Fecha de inicio:</p>
        <span>
          <select {...register("experienceMonthStart", { required: true })}>
            {listOfMonths}
          </select>
          <select {...register("experienceYearStart", { required: true })}>
            {listOfYears}
          </select>
        </span>
        <br />
        <p>Fecha de finalización:</p>
        <span>
          <select {...register("experienceMonthEnd", { required: true })}>
            {listOfMonths}
          </select>
          <select {...register("experienceYearEnd", { required: true })}>
            {listOfYears}
          </select>
        </span>
        <h1>Agregar tu nivel de estudios:</h1>
        <p>Nombre de la institución:</p>
        <input type="text" {...register("institution", { required: true })} />
        <br />
        <br />
        <select {...register("educationLevel", { required: true })}>
          <option value="Educación Superior - Licenciatura" defaultValue={true}>
            Educación Superior - Licenciatura
          </option>
          <option value="Educación Superior - Especialidad">
            Educación Superior - Especialidad
          </option>
          <option value="Educación Superior - Maestría">
            Educación Superior - Maestría
          </option>
          <option value="Educación Superior - Doctorado">
            Educación Superior - Doctorado
          </option>
        </select>
        <p>Área profesional</p>
        <input type="text" {...register("area", { required: true })} />
        <br />
        <br />
        <p>Fecha de inicio:</p>
        <span>
          <select {...register("studiesMonthStart", { required: true })}>
            {listOfMonths}
          </select>
          <select {...register("studiesYearStart", { required: true })}>
            {listOfYears}
          </select>
        </span>
        <br />
        <br />
        <p>Fecha de finalización:</p>
        <span>
          <select {...register("studiesMonthEnd", { required: true })}>
            {listOfMonths}
          </select>
          <select {...register("studiesYearEnd", { required: true })}>
            {listOfYears}
          </select>
        </span>
        <h1>Selecciona tus areas de especialidad:</h1>
        <select {...register("nameArea", { required: true })}>
          {listOfSpecialtiesAreas}
        </select>
        <br />
        <br />
        <button type="submit">Finalizar</button>
      </form>

      <Toaster richColors position="top-right" />
    </main>
  );
}
