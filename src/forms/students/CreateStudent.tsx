import { useForm } from "react-hook-form";
import type { StudentRequest } from "../../data/request/StudentRequest";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "../../components/form/InputForm";

export const studentSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastname: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),

  dni: z
    .string()
    .regex(/^\d+$/, "El DNI solo puede contener números")
    .min(7, "El DNI debe tener al menos 7 dígitos")
    .max(15, "El DNI no puede tener más de 15 dígitos"),

  birthDate: z.string().refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime()) && date < new Date();
    },
    {
      message: "La fecha de nacimiento debe ser válida y en el pasado",
    }
  ),
});

interface CreateStudentProps {
  onCreate: (data: StudentRequest) => void;
}

const CreateStudent = ({ onCreate }: CreateStudentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<StudentRequest>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      lastname: "",
      dni: "",
      birthDate: "",
    },
  });

  const onSubmit = (data: StudentRequest) => {
    onCreate(data);
    reset();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        type="text"
        label="Nombre"
        props={{
          ...register("name"),
        }}
        error={errors.name?.message}
      />
      <InputForm
        type="text"
        label="Apellido"
        props={{
          ...register("lastname"),
        }}
        error={errors.lastname?.message}
      />
      <InputForm
        type="text"
        label="DNI"
        props={{
          ...register("dni"),
        }}
        error={errors.dni?.message}
      />

      <InputForm
        type="date"
        label="Fecha de nacimiento"
        props={{
          ...register("birthDate"),
        }}
        error={errors.birthDate?.message}
      />

      <button type="submit" disabled={isSubmitting} className="btn-primary">
        Guardar
      </button>
    </form>
  );
};

export default CreateStudent;
