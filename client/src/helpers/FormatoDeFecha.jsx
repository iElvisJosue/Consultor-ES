export const dateLastUpdate = (date) => {
  const updatedAtDate = new Date(date);

  const day = updatedAtDate.getDate();
  const month = updatedAtDate.getMonth();
  const year = updatedAtDate.getFullYear();
  const hour = updatedAtDate.getHours();
  const minutes = updatedAtDate.getMinutes();

  const formatDate = `${day}/${month}/${year} a las ${hour}:${minutes}`;

  return formatDate;
};
export const dateCreate = (date) => {
  const updatedAtDate = new Date(date);

  const day = updatedAtDate.getDate();
  const month = updatedAtDate.getMonth();
  const year = updatedAtDate.getFullYear();
  const hour = updatedAtDate.getHours();
  const minutes = updatedAtDate.getMinutes();

  const formatDate = `${day}/${month}/${year} a las ${hour}:${minutes}`;

  return formatDate;
};
