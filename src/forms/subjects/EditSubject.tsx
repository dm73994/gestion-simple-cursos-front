import { useEffect } from "react";
import type { SubjectRequest } from "../../data/request/SubjectRequest";
import useSubject from "../../hooks/useSubject";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

interface EditSubjectProps {
  subjectId: number;
  onUpdate: (data: SubjectRequest) => void;
}

const EditSubject = ({ subjectId, onUpdate }: EditSubjectProps) => {
  const { fetchSubject, isLoading, error } = useSubject();

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

  useEffect(() => {
    const loadSubject = async () => {
      const data = await fetchSubject(subjectId);
      reset({
        name: data.name,
        code: data.code,
        credits: data.credits,
      });
    };

    loadSubject();
  }, [subjectId, reset]);

  const onSubmit = async (data: SubjectRequest) => {
    onUpdate(data);
  };

  return (
    <form className="subject-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Nombre</label>
        <input {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label>Código</label>
        <input type="number" {...register("code", { valueAsNumber: true })} />
        {errors.code && <span>{errors.code.message}</span>}
      </div>

      <div className="form-group">
        <label>Créditos</label>
        <input
          type="number"
          {...register("credits", { valueAsNumber: true })}
        />
        {errors.credits && <span>{errors.credits.message}</span>}
      </div>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" disabled={isLoading}>
        Actualizar materia
      </button>
    </form>
  );
};

export default EditSubject;
