import "../../../styles/website/PreguntanosFormulario.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function PreguntanosFormulario() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const contentInputs = [
    {
      name: "name",
      icon: "person-outline",
      placeholder: "Nombre (s)",
      type: "text",
      validator: {
        required: "Este campo es obligatorio. ⚠️",
        maxLength: {
          value: 100,
          message: "Este campo no puede tener más de 100 caracteres. 🔠",
        },
      },
    },
    {
      name: "lastName",
      icon: "person-outline",
      placeholder: "Apellidos",
      type: "text",
      validator: {
        required: "Este campo es obligatorio. ⚠️",
        maxLength: {
          value: 100,
          message: "Este campo no puede tener más de 100 caracteres. 🔠",
        },
      },
    },
    {
      name: "phone",
      icon: "call-outline",
      placeholder: "Teléfono",
      type: "text",
      validator: {
        required: "Este campo es obligatorio. ⚠️",
        pattern: {
          value: /^\d+$/,
          message: "Este campo solo acepta números. 🔢",
        },
        maxLength: {
          value: 20,
          message: "Este campo no puede tener más de 20 caracteres. 🔠",
        },
      },
    },
    {
      name: "email",
      icon: "mail-outline",
      placeholder: "Correo",
      type: "email",
      validator: {
        required: "Este campo es obligatorio. ⚠️",
        pattern: {
          value: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
          message: "El correo no es válido. 🚫",
        },
        maxLength: {
          value: 100,
          message: "Este campo no puede tener más de 100 caracteres. 🔠",
        },
      },
    },
    {
      name: "company",
      icon: "business-outline",
      placeholder: "Empresa",
      type: "text",
      validator: {
        required: "Este campo es obligatorio. ⚠️",
        maxLength: {
          value: 100,
          message: "Este campo no puede tener más de 100 caracteres. 🔠",
        },
      },
    },
  ];

  const sendForm = handleSubmit((data) => console.log(data));

  return (
    <div className="Main__Brown">
      <section className="Main__AskUs__Form">
        <div className="Main__AskUs__Form--Presentation">
          <p className="Main__AskUs__Form--Presentation--Title">
            Vas a contactar con el equipo de Consultor-Es.
          </p>
          <p className="Main__AskUs__Form--Presentation--Subtitle">
            Te ayudaremos a encontrar lo que necesitas.
          </p>
        </div>
        <form
          onSubmit={sendForm}
          className="Main__AskUs__Form--Form"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          {contentInputs.map(
            ({ name, icon, placeholder, type, validator }, index) => (
              <>
                <div
                  className="Main__AskUs__Form--Form--ContainerInputs"
                  key={index}
                >
                  <span className="Main__AskUs__Form--Form--ContainerInputs--Icon">
                    <ion-icon name={icon}></ion-icon>
                  </span>
                  <input
                    type={type}
                    {...register(name, validator)}
                    className="Main__AskUs__Form--Form--ContainerInputs--Inputs"
                    placeholder={placeholder}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <small
                        key={type}
                        className="Main__AskUs__Form--Form--ContainerInputs--Error"
                      >
                        {message}
                      </small>
                    ))
                  }
                />
              </>
            )
          )}
          <textarea
            cols="10"
            rows="10"
            maxLength={2500}
            className="Main__AskUs__Form--Form--ContainerInputs--Inputs textArea"
            placeholder="¿En qué podemos ayudarte? Escribe aquí."
            {...register("fullMessage", {
              required: true,
            })}
          ></textarea>
          {errors.fullMessage && (
            <small className="Main__AskUs__Form--Form--ContainerInputs--Error">
              Este campo es obligatorio. ⚠️
            </small>
          )}
          <button className="Main__AskUs__Form--Form--Button" type="submit">
            <p className="Main__AskUs__Form--Form--Button--Text">Enviar</p>
          </button>
        </form>
      </section>
    </div>
  );
}
