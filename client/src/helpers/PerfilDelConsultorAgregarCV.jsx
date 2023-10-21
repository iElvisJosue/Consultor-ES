import {
  listOfSpecialtiesAreas,
  listOfEducationalLevels,
} from "../helpers/Selectores";

export const resumeHeaderProps = {
  imgUrl: "./ResumenProfesional.png",
  imgAlt: "Resumen De Perfil Logo",
  title: "Resumen de tu perfil profesional:",
  subtitle: "(Creación de tu CV)",
};
export const experienceHeaderProps = {
  imgUrl: "./ExperienciaProfesional.png",
  imgAlt: "Experiencia De Perfil Logo",
  title: "Agrega tu experiencia más relevante:",
  subtitle: "(Creación de tu CV)",
};
export const educationHeaderProps = {
  imgUrl: "./EducacionPersonal.png",
  imgAlt: "Educación Personal Logo",
  title: "Agrega tu nivel de estudios:",
  subtitle: "(Creación de tu CV)",
};
export const skillsHeaderProps = {
  imgUrl: "./EspecialidadPersonal.png",
  imgAlt: "Especialidad Personal Logo",
  title: "Selecciona tu especialidad:",
  subtitle: "(Creación de tu CV)",
};
export const resumeInformationData = [
  {
    icon: "briefcase-outline",
    inputType: "text",
    inputName: "profession",
    placeholder: "Profesión",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    icon: "document-text-outline",
    inputType: "text",
    inputName: "description",
    placeholder: "Resumen breve",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 5000,
        message: "¡Este campo no puede tener más de 5000 caracteres! 🔠",
      },
    },
  },
];
export const experienceInformationData = [
  {
    icon: "accessibility-outline",
    inputType: "text",
    inputName: "position",
    placeholder: "Puesto/Cargo",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 250,
        message: "¡Este campo no puede tener más de 250 caracteres! 🔠",
      },
    },
  },
  {
    icon: "business-outline",
    inputType: "text",
    inputName: "company",
    placeholder: "Empresa",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 250,
        message: "¡Este campo no puede tener más de 250 caracteres! 🔠",
      },
    },
  },
  {
    icon: "document-text-outline",
    inputType: "text",
    inputName: "resume",
    placeholder: "Resumen breve",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 5000,
        message: "¡Este campo no puede tener más de 5000 caracteres! 🔠",
      },
    },
  },
];
export const educationInformationData = [
  {
    icon: "school-outline",
    inputType: "text",
    inputName: "institution",
    placeholder: "Institución",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 250,
        message: "¡Este campo no puede tener más de 250 caracteres! 🔠",
      },
    },
  },
  {
    icon: "footsteps-outline",
    inputName: "educationLevel",
    placeholder: "Nivel de estudios",
    isSelect: true,
    typeList: listOfEducationalLevels,
  },
  {
    icon: "library-outline",
    inputType: "text",
    inputName: "area",
    placeholder: "Área de estudios",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 250,
        message: "¡Este campo no puede tener más de 250 caracteres! 🔠",
      },
    },
  },
];
export const skillsInformationData = [
  {
    title: "Selecciona tu especialidad:",
    icon: "medal-outline",
    inputName: "nameArea",
    typeList: listOfSpecialtiesAreas,
  },
];
export const abilityInformationData = [
  {
    icon: "dice-outline",
    inputType: "text",
    inputName: "nameSkill",
    placeholder: "React JS / HTML / CSS",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      minLength: {
        value: 3,
        message: "¡Este campo no puede tener menos de 3 caracteres! 🔠",
      },
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
];
