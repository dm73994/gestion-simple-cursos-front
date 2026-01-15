import { useForm } from "react-hook-form";
import type { StudentRequest } from "../../data/request/StudentRequest";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  };

  return (
    <form className="student-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre</label>
        <input {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Apellido</label>
        <input {...register("lastname")} />
        {errors.lastname && <span>{errors.lastname.message}</span>}
      </div>

      <div>
        <label>DNI</label>
        <input {...register("dni")} inputMode="numeric" pattern="[0-9]*" />
        {errors.dni && <span>{errors.dni.message}</span>}
      </div>

      <div>
        <label>Fecha de nacimiento</label>
        <input type="date" {...register("birthDate")} />
        {errors.birthDate && <span>{errors.birthDate.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Guardar
      </button>
    </form>
  );
};

export default CreateStudent;
