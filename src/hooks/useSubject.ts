import { useState } from "react";
import type { SubjectModel } from "../data/models/SubjectModel";
import {
  createSubject,
  deleteSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
} from "../services/api/subjectsServices";
import type { SubjectRequest } from "../data/request/SubjectRequest";

const useSubject = () => {
  const [subjects, setSubjects] = useState<SubjectModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllSubjects = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getAllSubjects();
      setSubjects(data);
      return data;
    } catch (err) {
      setError("Error al cargar materias");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubject = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      return await getSubjectById(id);
    } catch (err) {
      setError("Error al cargar la materia");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addSubject = async (subject: SubjectRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await createSubject(subject);
      await fetchAllSubjects();
      return success;
    } catch (err) {
      setError("Error al crear la materia");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const editSubject = async (id: number, subject: SubjectRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await updateSubject(id, subject);
      await fetchAllSubjects();
      return success;
    } catch (err) {
      setError("Error al actualizar la materia");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeSubject = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await deleteSubject(id);
      setSubjects((prev) => prev.filter((s) => s.id !== id));
      return success;
    } catch (err) {
      setError("Error al eliminar la materia");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subjects,
    isLoading,
    error,
    fetchAllSubjects,
    fetchSubject,
    addSubject,
    editSubject,
    removeSubject,
  };
};

export default useSubject;
