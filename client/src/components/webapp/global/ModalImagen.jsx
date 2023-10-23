/* eslint-disable react/prop-types */

import useUpdateImage from "../../../hooks/useUpdateImage";

export default function ModalImagen({ setShowModalImage, classModalImage }) {
  const {
    hasImage,
    handleFileChange,
    validateImage,
    showError,
    resetModalImage,
  } = useUpdateImage({ setShowModalImage });

  return (
    <form
      className={classModalImage}
      onSubmit={validateImage}
      encType="multipart/form-data"
    >
      <div className="Main__Modal--Content">
        <p className="Main__Modal--Content--Title Image">ACTUALIZAR IMAGEN</p>
        <picture className="Main__Modal--Content--Picture">
          <img src="./CambiarImagen.png" alt="Completar El Proyecto" />
        </picture>
        <p className="Main__Modal--Content--Description">
          Por favor, selecciona una imagen en formato PNG, JPG o JPEG con un
          tamaño máximo de 2MB.
        </p>
        <label className="Main__Modal--Content--InputFile">
          <input
            type="file"
            accept="image/*"
            name="userPicture"
            onChange={handleFileChange}
          />
          {hasImage ? hasImage?.name : "Seleccionar Imagen"}
        </label>
        {showError && (
          <span className="Main__Modal--Content--SmallError">
            ¡Por favor, selecciona una imagen! ⚠️
          </span>
        )}
        <span className="Main__Modal--Content--Buttons">
          <button
            className="Main__Modal--Content--Buttons--Cancel Image"
            onClick={resetModalImage}
          >
            Cancelar
          </button>
          <button className="Main__Modal--Content--Buttons--Confirm Image">
            Actualizar
          </button>
        </span>
      </div>
    </form>
  );
}
