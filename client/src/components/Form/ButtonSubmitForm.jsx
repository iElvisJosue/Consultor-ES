export default function ButtonSubmitForm({
  // eslint-disable-next-line react/prop-types
  text = "Siguiente",
}) {
  return (
    <button type="submit" className="Main__Form--ButtonSubmit">
      {text}
    </button>
  );
}
