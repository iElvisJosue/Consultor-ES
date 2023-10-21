// HELPERS
import { listOfServices, listOfSector, listOfChallenges } from "./Selectores";
export const inputsShowDataUserProfile = [
  [
    {
      name: "userName",
      icon: "person-outline",
      title: "Usuario:",
      type: "text",
    },
    {
      name: "email",
      icon: "mail-outline",
      title: "Correo:",
      type: "email",
    },
  ],
];
export const inputsEditDataProfile = [
  [
    {
      name: "name",
      icon: "person-circle-outline",
      title: "Nombre(s):",
      type: "text",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 100,
          message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
        },
      },
    },
    {
      name: "lastName",
      icon: "person-circle-outline",
      title: "Apellido paterno:",
      type: "text",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 100,
          message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
        },
      },
    },
  ],
  [
    {
      name: "motherLastName",
      icon: "person-circle-outline",
      title: "Apellido materno:",
      type: "text",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 100,
          message: "Este campo no puede tener más de 100 caracteres. 🔠",
        },
      },
    },
    {
      name: "number",
      icon: "call-outline",
      title: "Número de teléfono:",
      type: "text",
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
  ],
  [
    {
      name: "LinkedIn",
      icon: "logo-linkedin",
      title: "LinkedIn:",
      type: "text",
    },
  ],
];
export const inputsEditDataBusiness = [
  [
    {
      icon: "business-outline",
      inputType: "text",
      inputName: "businessName",
      title: "Razón social:",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 100,
          message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
        },
      },
    },
    {
      icon: "cash-outline",
      inputType: "text",
      inputName: "estimatedValue",
      title: "Presupuesto:",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        pattern: {
          value: /^\d+$/,
          message: "Este campo solo acepta números. 🔢",
        },
      },
    },
  ],
  [
    {
      icon: "help-circle-outline",
      inputType: "text",
      inputName: "helpMe",
      title: "¿En qué te podemos ayudar?:",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 2500,
          message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
        },
      },
    },
    {
      icon: "keypad-outline",
      inputType: "select",
      inputName: "serviceArea",
      title: "Servicio de tu negocio:",
      typeList: listOfServices,
    },
  ],
  [
    {
      icon: "keypad-outline",
      inputType: "select",
      inputName: "businessSector",
      title: "Sector de tu negocio:",
      typeList: listOfSector,
    },
    {
      icon: "extension-puzzle-outline",
      inputType: "select",
      inputName: "challenges",
      title: "Desafío de tu negocio:",
      typeList: listOfChallenges,
    },
  ],
];
