export const inputsCreateProject = [
  [
    {
      name: "nameProject",
      icon: "file-tray-full-outline",
      title: "Nombre:",
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
      name: "paymentProject",
      icon: "cash-outline",
      title: "Pago:",
      type: "text",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        pattern: {
          value: /^\d+$/,
          message: "Este campo solo acepta números. 🔢",
        },
        maxLength: {
          value: 10,
          message: "Este campo no puede tener más de 10 caracteres. 🔠",
        },
      },
    },
  ],
  [
    {
      name: "timeProject",
      icon: "time-outline",
      title: "Tiempo Estimado:",
      type: "text",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 15,
          message: "¡Este campo no puede tener más de 15 caracteres! 🔠",
        },
      },
    },
    {
      name: "areaProject",
      icon: "construct-outline",
      title: "Area:",
      type: "select",
    },
  ],
  [
    {
      name: "detailsProject",
      icon: "document-text-outline",
      title: "Detalles:",
      type: "textarea",
      validator: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 5000,
          message: "¡Este campo no puede tener más de 5000 caracteres! 🔠",
        },
      },
    },
  ],
];
