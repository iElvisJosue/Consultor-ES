import "../../../styles/webapp/Loader.css";

// eslint-disable-next-line react/prop-types
export default function Loader({ text = "Cargando..." }) {
  return (
    <section className="Main__Loader">
      <div className="loader"></div>
      <h1>{text}</h1>
    </section>
  );
}
