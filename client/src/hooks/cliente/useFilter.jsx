import { useState } from "react";

export default function useFilter({ projectsClient }) {
  const [filter, setFilter] = useState("Activos");

  const projectsActive = projectsClient.filter(
    ({ isCompleted }) => !isCompleted
  );
  const projectsCompleted = projectsClient.filter(
    ({ isCompleted }) => isCompleted
  );

  const projectsFiltered =
    filter === "Activos" ? projectsActive : projectsCompleted;

  return {
    projectsActive,
    projectsCompleted,
    projectsFiltered,
    filter,
    setFilter,
  };
}
