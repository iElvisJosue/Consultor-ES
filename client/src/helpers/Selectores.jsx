// LISTA DE MESES
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
export const listOfMonths = months.map((month, index) =>
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

months.unshift("Actualmente");
export const listOfMonthsExperience = months.map((month, index) =>
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

// LISTA DE AÑOS
const years = [];
for (let i = new Date().getFullYear(); i >= 1930; i--) {
  years.push(i);
}
export const listOfYears = years.map((year, index) =>
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
years.unshift("Trabajando");
export const listOfYearsExperience = years.map((year, index) =>
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

// LISTA DE ÁREAS
const specialtiesAreas = [
  "CRM",
  "Diseño de productos, servicios y modelos de negocio (Product owner, Service Design, etc)",
  "Comercial / Ventas",
  "Customer loyalty y fidelización",
  "Ecommerce y Marketplace",
  "Comunicación y contenidos",
  "Estrategia",
  "Innovación tecnológica (Internet of ThingS, IA, 3d printing, robotics, blockchain, etc)",
  "Internacionalización",
  "Marca, posicionamiento y comunicación",
  "Market Research / Customer Experience",
  "Marketing Digital y growth hacking",
  "Modelos de gestión / Management",
  "Multicanalidad (Contact Center, atención al cliente, etc)",
  "Usabilidad (UX / UI)",
  "Sostenibilidad",
  "Automatización y robotización de procesos",
  "Compliance / gestión de riesgos",
  "Data Analytics & Business Intelligence",
  "Desarrolladores (Web y App developer)",
  "Logística y Supply Chain",
  "Operaciones",
  "Project management (PMO, digital project manager, etc)",
  "Consultoría IT (planes de sistemas, implantación de ERPs, etc)",
  "Búsqueda de Financiación",
  "Estrategia financiera / Corporate Finance",
  "Innovación en las finanzas a nivel de procesos y de negocio",
  "Refinanciación y Reestructuración",
  "Desarrollo y gestión de liderazgo",
  "Experiencia de empleado",
  "Gestión del cambio y Cultura digital (Agile, Scrum, etc)",
  "Transformación organizacionalPlan de Igualdad",
  "Transformación digital",
];
export const listOfSpecialtiesAreas = specialtiesAreas.map(
  (specialties, index) =>
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

// LISTA DE LENGUAJES
const languages = [
  "Inglés",
  "Chino mandarín",
  "Hindi",
  "Español",
  "Francés",
  "Árabe",
  "Árabe",
  "Ruso",
  "Portugués",
  "Urdu",
];
export const listOfLanguages = languages.map((language, index) =>
  index === 0 ? (
    <option key={index} value={language} defaultValue={true}>
      {language}
    </option>
  ) : (
    <option key={index} value={language}>
      {language}
    </option>
  )
);

// LISTA DE NIVELES DEL LENGUAJE
const levelLanguages = [
  "Muy Básico",
  "Básico",
  "Intermedio",
  "Avanzado",
  "Nativo",
];
export const listOfLevelLanguages = levelLanguages.map((level, index) =>
  index === 0 ? (
    <option key={index} value={level} defaultValue={true}>
      {level}
    </option>
  ) : (
    <option key={index} value={level}>
      {level}
    </option>
  )
);

// LISTA DE SERVICIOS
const services = [
  "Selecciona un servicio",
  "Fiscal",
  "Contable",
  "Legal",
  "Operativa",
  "Organizacional",
];
export const listOfServices = services.map((service, index) =>
  index === 0 ? (
    <option
      key={index}
      value="Selecciona un servicio"
      defaultValue={true}
      hidden
    >
      {service}
    </option>
  ) : (
    <option key={index} value={service}>
      {service}
    </option>
  )
);

// LISTA DE SECTORES
const sector = [
  "Selecciona un sector",
  "Agroalimentario",
  "Automoción",
  "Banca",
  "Construcción / Inmobiliario",
  "Educación",
  "Entretenimiento",
  "Gimnasios",
  "Hoteles",
  "Restauración",
  "Retail / Consumer Products",
  "Salud",
  "Servicios profesionales",
  "Tecnológicas",
  "Telecomunicaciones",
  "Transportes",
  "Utilities",
  "Otro",
];
export const listOfSector = sector.map((sector, index) =>
  index === 0 ? (
    <option key={index} value="Selecciona un sector" defaultValue={true} hidden>
      {sector}
    </option>
  ) : (
    <option key={index} value={sector}>
      {sector}
    </option>
  )
);

// LISTA DE RETOS
const challenges = [
  "Selecciona un reto",
  "Crecer y Fidelizar",
  "Reducir costes y Mejorar",
  "Finanzas",
  "Personas",
  "Tengo otro reto",
];
export const listOfChallenges = challenges.map((challenge, index) =>
  index === 0 ? (
    <option key={index} value="Selecciona un reto" defaultValue={true} hidden>
      {challenge}
    </option>
  ) : (
    <option key={index} value={challenge}>
      {challenge}
    </option>
  )
);

// LISTA DE NIVELES EDUCATIVOS
const educationalLevels = [
  "Educación Superior - Licenciatura",
  "Educación Superior - Especialidad",
  "Educación Superior - Maestría",
  "Educación Superior - Doctorado",
];
export const listOfEducationalLevels = educationalLevels.map((level, index) =>
  index === 0 ? (
    <option key={index} value={level} defaultValue={true}>
      {level}
    </option>
  ) : (
    <option key={index} value={level}>
      {level}
    </option>
  )
);
