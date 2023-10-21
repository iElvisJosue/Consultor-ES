// LIBRERÍAS A USAR
import { useState } from "react";

export default function useModalComplete() {
  const [showModalComplete, setShowModalComplete] = useState(false);

  const classModalComplete = showModalComplete
    ? "Main__Modal Show"
    : "Main__Modal";

  return {
    classModalComplete,
    setShowModalComplete,
  };
}
