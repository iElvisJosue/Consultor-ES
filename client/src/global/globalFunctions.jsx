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
