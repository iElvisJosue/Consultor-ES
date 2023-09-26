import { z } from "zod";

export const emailVerificationCode = z.object({
  email: z
    .string({
      required_error: "CORREO REQUERIDO",
    })
    .email({
      message: "CORREO INVALIDO",
    }),
});

export const dataConsultant = z.object({
  name: z.string({
    required_error: "EL NOMBRE ES REQUERIDO",
  }),
  lastName: z.string({
    required_error: "EL APELLIDO PATERNO ES REQUERIDO",
  }),
  motherLastName: z.string({
    required_error: "EL APELLIDO MATERNO ES REQUERIDO",
  }),
  number: z.string({
    required_error: "EL NÚMERO DE TELÉFONO ES REQUERIDO",
  }),
});

export const dataClient = z.object({
  name: z.string({
    required_error: "EL NOMBRE ES REQUERIDO",
  }),
  lastName: z.string({
    required_error: "EL APELLIDO PATERNO ES REQUERIDO",
  }),
  motherLastName: z.string({
    required_error: "EL APELLIDO MATERNO ES REQUERIDO",
  }),
  number: z.string({
    required_error: "EL NÚMERO DE TELÉFONO ES REQUERIDO",
  }),
  businessName: z.string({
    required_error: "EL NOMBRE DE NEGOCIO ES REQUERIDO",
  }),
  serviceArea: z.string({
    required_error: "EL AREA DE SERVICIO ES REQUERIDO",
  }),
  businessSector: z.string({
    required_error: "EL SECTOR DE NEGOCIO ES REQUERIDO",
  }),
  estimatedValue: z.string({
    required_error: "EL VALOR ESTIMADO ES REQUERIDO",
  }),
  challenges: z.string({
    required_error: "EL RETO ES REQUERIDO",
  }),
  helpMe: z.string({
    required_error: "EL AYUDA ES REQUERIDA",
  }),
});

export const dataUser = z.object({
  userName: z.string({
    required_error: "EL NOMBRE DE USUARIO ES REQUERIDO",
  }),
  password: z.string({
    required_error: "LA CONTRASEÑA ES REQUERIDA",
  }),
});

export const dataLogin = z.object({
  yourUserName: z.string({
    required_error: "EL NOMBRE DE USUARIO ES REQUERIDO",
  }),
  yourPassword: z.string({
    required_error: "LA CONTRASEÑA ES REQUERIDA",
  }),
});

export const dataResumeCV = z.object({
  profession: z.string({
    required_error: "LA PROFESIÓN ES REQUERIDA",
  }),
  description: z.string({
    required_error: "LA DESCRIPCIÓN ES REQUERIDA",
  }),
});
