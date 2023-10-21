export const codeVerificationHeaderProps = ({ role, email }) => {
  return {
    url: `./${role}VerificacionDeCorreo`,
    imgUrl: "./EmailEnviado.png",
    imgAlt: "Email Enviado Icon",
    title: "Verificación de Correo Electrónico. 🖐️",
    subtitle: `Por favor ingresa el código de 6 dígitos que hemos enviado a ${email}. No olvides checar tu bandeja de SPAM.`,
  };
};
