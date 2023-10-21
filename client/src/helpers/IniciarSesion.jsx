export const loginHeaderProps = {
  url: "/",
  imgUrl: "./LogoConsultores.png",
  imgAlt: "Consultor-ES Logo",
  title: "¡Hola de nuevo 👋!",
};
export const loginInputsProps = [
  {
    icon: "person-outline",
    inputType: "text",
    inputName: "yourUserName",
    placeholder: "Usuario",
    messageError: "¡Este campo es obligatorio! ⚠️",
  },
  {
    icon: "lock-closed-outline",
    inputType: "password",
    inputName: "yourPassword",
    placeholder: "Contraseña",
    messageError: "¡Este campo es obligatorio! ⚠️",
    secondIcon: true,
  },
];
