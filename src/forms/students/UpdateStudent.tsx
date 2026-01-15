import { useEffect, useState } from "react";
import useStudent from "../../hooks/useStudent";
import type { StudentRequest } from "../../data/request/StudentRequest";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string().min(2),
  lastname: z.string().min(2),
  dni: z
    .string()
    .regex(/^\d+$/, "El DNI solo debe contener números")
    .min(7)
    .max(15),
  birthDate: z.string(),
});

interface UpdateStudentProps {
  studentId: number;
}

const UpdateStudent = ({ studentId }: UpdateStudentProps) => {
  const { fetchStudent, editStudent, isLoading, error } = useStudent();
  const [loadingData, setLoadingData] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentRequest>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const data = await fetchStudent(studentId);

        reset({
          id: data.id,
          name: data.name,
          lastname: data.lastname,
          dni: data.dni,
          birthDate: new Date(data.birthDate).toISOString().split("T")[0],
        });
      } finally {
        setLoadingData(false);
      }
    };

    loadStudent();
  }, [studentId]);

  const onSubmit = async (formData: StudentRequest) => {
    await editStudent(formData);
  };

  if (loadingData) return <p>Cargando información...</p>;

  return (
    <form className="student-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Nombre</label>
        <input {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label>Apellido</label>
        <input {...register("lastname")} />
        {errors.lastname && <span>{errors.lastname.message}</span>}
      </div>

      <div className="form-group">
        <label>DNI</label>
        <input {...register("dni")} />
        {errors.dni && <span>{errors.dni.message}</span>}
      </div>

      <div className="form-group">
        <label>Fecha de nacimiento</label>
        <input type="date" {...register("birthDate")} />
        {errors.birthDate && <span>{errors.birthDate.message}</span>}
      </div>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" disabled={isLoading}>
        Guardar cambios
      </button>
    </form>
  );
};

export default UpdateStudent;
