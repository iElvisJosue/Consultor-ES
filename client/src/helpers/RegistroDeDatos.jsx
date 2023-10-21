import { listOfServices, listOfSector, listOfChallenges } from "./Selectores";

export const registerDataHeaderProps = (role) => {
  return {
    url: `./${role}VerificacionDeCodigo`,
    imgUrl: "./InformacionPersonal.png",
    imgAlt: "Información personal Logo",
    title: "Ingresa tus datos personales para finalizar tu registro. ✍️",
  };
};
const sharedFields = [
  {
    icon: "person-outline",
    inputType: "text",
    inputName: "userName",
    placeholder: "Nombre de usuario",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      minLength: {
        value: 6,
        message: "¡Este campo no puede tener menos de 6 caracteres! 🔠",
      },
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    icon: "lock-closed-outline",
    inputType: "password",
    inputName: "password",
    placeholder: "Contraseña",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      minLength: {
        value: 8,
        message: "¡Este campo no puede tener menos de 8 caracteres! 🔠",
      },
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    icon: "person-circle-outline",
    inputType: "text",
    inputName: "name",
    placeholder: "Nombre(s)",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    icon: "person-circle-outline",
    inputType: "text",
    inputName: "lastName",
    placeholder: "Apellido paterno",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    icon: "person-circle-outline",
    inputType: "text",
    inputName: "motherLastName",
    placeholder: "Apellido materno",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    icon: "call-outline",
    inputType: "text",
    inputName: "number",
    placeholder: "Número de teléfono",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "Este campo solo acepta números. 🔢",
      },
      maxLength: {
        value: 20,
        message: "Este campo no puede tener más de 20 caracteres. 🔠",
      },
    },
  },
];
export const registerInformationData = {
  Consultor: [
    ...sharedFields,
    {
      icon: "logo-linkedin",
      inputType: "text",
      inputName: "LinkedIn",
      placeholder: "Perfil de LinkedIn (Opcional)",
      required: false,
    },
  ],
  Cliente: [
    ...sharedFields,
    {
      icon: "business-outline",
      inputType: "text",
      inputName: "businessName",
      placeholder: "Razón social",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 100,
          message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
        },
      },
    },
    {
      icon: "keypad-outline",
      inputType: "select",
      inputName: "serviceArea",
      typeList: listOfServices,
    },
    {
      icon: "keypad-outline",
      inputType: "select",
      inputName: "businessSector",
      typeList: listOfSector,
    },
    {
      icon: "cash-outline",
      inputType: "text",
      inputName: "estimatedValue",
      placeholder: "Presupuesto",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        pattern: {
          value: /^\d+$/,
          message: "Este campo solo acepta números. 🔢",
        },
      },
    },
    {
      icon: "extension-puzzle-outline",
      inputType: "select",
      inputName: "challenges",
      typeList: listOfChallenges,
    },
    {
      icon: "help-circle-outline",
      inputType: "text",
      inputName: "helpMe",
      placeholder: "¿En qué te podemos ayudar?",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 2500,
          message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
        },
      },
    },
  ],
};
