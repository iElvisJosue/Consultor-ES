export const cvInformationResume = (consultantResume) => {
  return [
    {
      title: "👨‍⚖️ Profesión:",
      text: consultantResume.profession,
    },
    {
      title: "📝 Resumen Breve:",
      text: consultantResume.description,
    },
  ];
};
