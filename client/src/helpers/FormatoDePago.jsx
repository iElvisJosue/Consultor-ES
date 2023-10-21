export const formatPayment = (payment) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
    payment
  );
