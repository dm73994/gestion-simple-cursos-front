import { useState } from "react";
import type { StudentModel } from "../data/models/StudentModel";
import { createStudent, deleteStudent, fetchStudentById, fetchStudents, updateStudent } from "../services/api/studentsServices";
import type { StudentRequest } from "../data/request/StudentRequest";

const useStudent = () => {
  const [students, setStudents] = useState<StudentModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllStudents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchStudents();
      setStudents(data);
      return data;
    } catch (err: any) {
      setError("Error al cargar estudiantes");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudent = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      return await fetchStudentById(id);
    } catch (err: any) {
      setError("Error al cargar el estudiante");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addStudent = async (student: StudentRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await createStudent(student);
      if (success) {
        await fetchAllStudents();
      }
      return success;
    } catch (err: any) {
      setError("Error al crear estudiante");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const editStudent = async (student: StudentRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await updateStudent(student);
      if (success) {
        await fetchAllStudents();
      }
      return success;
    } catch (err: any) {
      setError("Error al actualizar estudiante");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeStudent = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await deleteStudent(id);
      if (success) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
      }
      return success;
    } catch (err: any) {
      setError("Error al eliminar estudiante");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    students,
    isLoading,
    error,
    fetchAllStudents,
    fetchStudent,
    addStudent,
    editStudent,
    removeStudent,
  };
};

export default useStudent;
