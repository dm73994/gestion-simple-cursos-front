import { customAxios } from "../../config/customAxios";
import type { StudentModel } from "../../data/models/StudentModel";
import type { StudentRequest } from "../../data/request/StudentRequest";

export const fetchStudents = async (): Promise<StudentModel[]> => {
  try {
    const res = await customAxios.get<StudentModel[]>("/students");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchStudentById = async (id: number): Promise<StudentModel> => {
  try {
    if(!id) throw new Error("ID del estudiante no proporcionado");
    const res = await customAxios.get<StudentModel>(`/students/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createStudent = async (
  student: StudentRequest
): Promise<boolean> => {
  try {
    const res = await customAxios.post("/students", student);
    return res.status === 200 ? true : false;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (
  id: number,
  student: StudentRequest
): Promise<boolean> => {
  try {
    if(!id) throw new Error("ID del estudiante no proporcionado");
    const res = await customAxios.put(`/students/${id}`, student);
    return res.status === 200 ? true : false;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id: number): Promise<boolean> => {
  try {
    const res = await customAxios.delete(`/students/${id}`);
    return res.status === 200 ? true : false;
  } catch (error) {
    throw error;
  }
};
