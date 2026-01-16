import { useForm } from "react-hook-form";
import { z } from "zod";
import type { SubjectRequest } from "../../data/request/SubjectRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "../../components/form/InputForm";
import '../../components/form/formStyles.css';

export const subjectSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  code: z
    .number({ error: "El código debe ser numérico" })
    .int("El código debe ser un número entero"),
  credits: z
    .number({ error: "Los créditos deben ser numéricos" })
    .int("Los créditos deben ser un número entero")
    .min(1, "Debe tener al menos 1 crédito"),
});

interface CreateSubjectProps {
  onCreate: (data: SubjectRequest) => void;
}

const CreateSubject = ({ onCreate }: CreateSubjectProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubjectRequest>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: "",
      code: undefined,
      credits: undefined,
    },
  });

  const onSubmit = async (data: SubjectRequest) => {
    onCreate(data);
    reset();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}
    >
      <InputForm 
        type="text"
        label="Nombre"
        error={errors.name?.message}
        props={{ ...register("name") }}
      />

      <InputForm
        type="number"
        label="Código"
        error={errors.code?.message}
        props={{ ...register("code", { valueAsNumber: true }) }}
      />
      <InputForm
        type="number"
        label="Créditos"
        error={errors.credits?.message}
        props={{ ...register("credits", { valueAsNumber: true }) }}
      />

      <button type="submit" className="btn-primary">Crear materia</button>
    </form>
  );
};

export default CreateSubject;
