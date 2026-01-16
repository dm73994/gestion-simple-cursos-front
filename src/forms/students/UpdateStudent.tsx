import { useEffect, useState } from "react";
import useStudent from "../../hooks/useStudent";
import type { StudentRequest } from "../../data/request/StudentRequest";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import '../../components/form/formStyles.css';
import InputForm from "../../components/form/InputForm";

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
  onUpdate: (data: StudentRequest) => void;
}

const UpdateStudent = ({ studentId, onUpdate }: UpdateStudentProps) => {
  const { fetchStudent,  isLoading } = useStudent();
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
    onUpdate(formData);
  };

  if (loadingData) return <p>Cargando información...</p>;

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

      <button type="submit" disabled={isLoading} className="btn-primary">
        Guardar cambios
      </button>
    </form>
  );
};

export default UpdateStudent;
