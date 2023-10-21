// LIBRERÍAS A USAR
import { useState } from "react";

export default function useModalDelete() {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [typeElementDelete, setTypeElementDelete] = useState(null);

  const classModalDelete = showModalDelete ? "Main__Modal Show" : "Main__Modal";

  return {
    classModalDelete,
    setShowModalDelete,
    typeElementDelete,
    setTypeElementDelete,
  };
}
