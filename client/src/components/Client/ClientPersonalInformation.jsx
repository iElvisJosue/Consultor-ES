/* eslint-disable react/prop-types */
export default function ClientPersonalInformation({ user, clientInformation }) {
  return (
    <>
      <h1>INFORMACIÓN PERSONAL</h1>
      <p>
        {clientInformation.dataClient.name}{" "}
        {clientInformation.dataClient.lastName}
        {clientInformation.dataClient.motherLastName}
      </p>
      <p>{user.email}</p>
      <p>{clientInformation.dataClient.number}</p>
      <br />
      <br />
      <hr />
      <h1>INFORMACIÓN DE NEGOCIO</h1>
      <p>{clientInformation.dataClient.businessName}</p>
      <p>{clientInformation.dataClient.businessSector}</p>
      <p>{clientInformation.dataClient.estimatedValue}</p>
      <p>{clientInformation.dataClient.serviceArea}</p>
    </>
  );
}
