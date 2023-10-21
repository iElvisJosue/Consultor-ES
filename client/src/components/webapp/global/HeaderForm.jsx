/* eslint-disable react/prop-types */
import "../../../styles/webapp/HeaderForm.css";
export default function HeaderForm({
  url = false,
  imgUrl = false,
  imgAlt = false,
  title = false,
  subtitle = false,
}) {
  return (
    <>
      {url && (
        <a href={url} className="Main__Form--Back">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </a>
      )}
      {imgUrl && <img src={imgUrl} alt={imgAlt} className="Main__Form--Img" />}
      {title && <h2 className="Main__Form--Title">{title}</h2>}
      {subtitle && <small className="Main__Form--Subtitle">{subtitle}</small>}
      <hr className="Main__Form--Divisor" />
    </>
  );
}
