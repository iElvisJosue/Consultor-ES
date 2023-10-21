export const emailVerificationHeaderProps = {
  url: "./IniciarSesion",
  imgUrl: "./EnviarEmail.png",
  imgAlt: "Enviar Email Icon",
  title: "Verificación de Correo Electrónico. 🖐️",
  subtitle:
    "(Enviaremos un código de 6 dígitos a tu correo para verificar tu cuenta)",
};

export const emailValidator = {
  required: "¡Este campo es obligatorio! ⚠️",
  pattern: {
    value: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
    message: "¡El correo no es válido! 🚫",
  },
  maxLength: {
    value: 100,
    message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
  },
};
