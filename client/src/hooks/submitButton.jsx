import { useState } from "react";

export default function HandleStatusSubmitButton() {
  const [isDisabled, setIsDisabled] = useState(false);

  const submitDisabled = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
  };

  return {
    isDisabled,
    submitDisabled,
  };
}
