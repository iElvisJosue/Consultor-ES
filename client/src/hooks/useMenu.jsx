import { useState } from "react";

export default function useMenu() {
  const [menu, setMenu] = useState("Perfil");

  const changeMenu = (option) => {
    setMenu(option);
  };

  return {
    menu,
    changeMenu,
  };
}
