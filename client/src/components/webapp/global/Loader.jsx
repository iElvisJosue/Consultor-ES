import "../../../styles/webapp/Loader.css";

// eslint-disable-next-line react/prop-types
export default function Loader({ small = false, text = "Cargando..." }) {
  const classLoader = small ? "Main__Loader Small" : "Main__Loader";

  return (
    <section className={classLoader}>
      <div className="loader"></div>
      <h1>{text}</h1>
    </section>
  );
}
