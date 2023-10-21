export const inputsAddBankProps = [
  [
    {
      name: "account",
      icon: "card-outline",
      title: "Número de cuenta o clabe:",
      type: "text",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        pattern: {
          value: /^\d+$/,
          message: "Este campo solo acepta números (Sin espacios). 🔢",
        },
        minLength: {
          value: 10,
          message: "¡Este campo no puede tener menos de 10 números! 🔢",
        },
        maxLength: {
          value: 34,
          message: "¡Este campo no puede tener más de 34 números! 🔢",
        },
      },
    },
    {
      name: "bank",
      icon: "business-outline",
      title: "Institución bancaria:",
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
      name: "name",
      icon: "person-circle-outline",
      title: "Nombre del titular:",
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
      name: "RFC",
      icon: "id-card-outline",
      title: "RFC:",
      type: "text",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 25,
          message: "Este campo no puede tener más de 25 caracteres. 🔠",
        },
      },
    },
  ],
  [
    {
      name: "country",
      icon: "earth-outline",
      title: "País de residencia:",
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
      name: "address",
      icon: "location-outline",
      title: "Dirección fiscal:",
      type: "text",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 250,
          message: "Este campo no puede tener más de 250 caracteres. 🔠",
        },
      },
    },
  ],
];
