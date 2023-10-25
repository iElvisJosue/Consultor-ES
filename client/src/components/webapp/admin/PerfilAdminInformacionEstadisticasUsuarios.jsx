/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilAdminInformacionEstadisticasUsuarios.css";

export default function PerfilAdminInformacionEstadisticasUsuarios({
  totalUsers,
  totalProjects,
  usersColors,
  projectsColors,
}) {
  const currentInformation = totalUsers || totalProjects;
  const currentColors = usersColors || projectsColors;

  const amountData = currentInformation.reduce(
    (acc, { value }) => acc + value,
    0
  );
  return (
    <article className="Main__Profile__Information--Content--Statistics--Users">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={currentInformation}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {currentInformation.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={currentColors[index % currentColors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <section className="Main__Profile__Information--Content--Statistics--Users--Details">
        <span className="Main__Profile__Information--Content--Statistics--Users--Details--Total">
          <p className="Main__Profile__Information--Content--Statistics--Users--Details--Total--Title">
            TOTAL
          </p>
          <strong>{amountData}</strong>
        </span>
        {currentInformation.map(({ name, value }, index) => (
          <span
            className="Main__Profile__Information--Content--Statistics--Users--Details--Users"
            key={name}
            style={{
              color: currentColors[index % currentColors.length],
            }}
          >
            <ion-icon name="ellipse"></ion-icon>
            {name}: {value}
          </span>
        ))}
      </section>
    </article>
  );
}
