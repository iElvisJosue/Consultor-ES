import { useState } from "react";

// CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// AYUDAS A USAR
import { handleResponseMessages } from "../helpers/Respuestas";

export default function useUpdateImage({ setShowModalImage }) {
  const { updateUserImage } = useGlobal();
  const [hasImage, setHasImage] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHasImage(file);
      setShowError(false);
    }
  };
  const validateImage = (e) => {
    e.preventDefault();
    if (hasImage) {
      if (!hasImage.type.startsWith("image")) {
        handleResponseMessages({
          status: 404,
          data: "El archivo seleccionado no es una imagen, por favor, selecciona una imagen.",
        });
        return;
      }
      if (hasImage.size > 1000000) {
        handleResponseMessages({
          status: 404,
          data: "La imagen sobrepasa el tamaño máximo, por favor, selecciona una imagen diferente o comprime la imagen.",
        });
        return;
      }
      updateImage(e);
    } else {
      setShowError(true);
    }
  };
  const updateImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("userPicture", hasImage);
      const res = await updateUserImage(formData);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      resetModalImage(e);
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const resetModalImage = (e) => {
    e.preventDefault();
    setShowError(false);
    setShowModalImage(false);
    setHasImage(null);
  };

  return {
    hasImage,
    handleFileChange,
    showError,
    resetModalImage,
    validateImage,
  };
}
