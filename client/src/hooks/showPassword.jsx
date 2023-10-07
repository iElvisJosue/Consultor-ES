import { useState } from "react";

export default function ShowPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const iconInputPassword = showPassword ? "eye-off-outline" : "eye-outline";

  const changeInputPassword = () => {
    setShowPassword(!showPassword);
    const inputPassword = document.querySelector("#password");
    inputPassword.type = showPassword ? "password" : "text";
  };

  return {
    iconInputPassword,
    changeInputPassword,
  };
}
