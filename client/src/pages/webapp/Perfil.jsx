// LIBRERÍAS A USAR
import { Toaster } from "sonner";

// CONTEXTOS A USAR
import { useGlobal } from "../../context/GlobalContext";

// COMPONENTES A USAR
import PerfilDelConsultor from "../../components/webapp/consultor/PerfilDelConsultor";
import PerfilDelCliente from "../../components/webapp/cliente/PerfilDelCliente";
import PerfilDelAdmin from "../../components/webapp/admin/PerfilDelAdmin";

// ESTILOS A USAR
import "../../styles/webapp/Perfil.css";

export default function Perfil() {
  const { user } = useGlobal();

  const profiles = {
    Consultor: <PerfilDelConsultor user={user} />,
    Cliente: <PerfilDelCliente user={user} />,
    Administrador: <PerfilDelAdmin user={user} />,
  };

  return (
    <main className="Main__Profile">
      {profiles[user.role]}
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
