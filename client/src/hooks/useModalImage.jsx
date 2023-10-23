// LIBRERÍAS A USAR
import { useState } from "react";

export default function useModalImage() {
  const [showModalImage, setShowModalImage] = useState(false);

  const classModalImage = showModalImage ? "Main__Modal Show" : "Main__Modal";

  return {
    classModalImage,
    setShowModalImage,
  };
}
