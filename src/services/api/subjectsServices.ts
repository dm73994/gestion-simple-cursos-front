import { customAxios } from "../../config/customAxios";
import type { SubjectModel } from "../../data/models/SubjectModel";
import type { SubjectRequest } from "../../data/request/SubjectRequest";

export const getAllSubjects = async (): Promise<SubjectModel[]> => {
  try {
    const res = await customAxios.get<SubjectModel[]>("/subjects");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getSubjectById = async (id: number): Promise<SubjectModel> => {
  try {
    const res = await customAxios.get<SubjectModel>(`/subjects/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createSubject = async (
  subject: SubjectRequest
): Promise<boolean> => {
  try {
    const res = await customAxios.post("/subjects", subject);
    return res.status === 200;
  } catch (error) {
    throw error;
  }
};

export const updateSubject = async (
  id: number,
  subject: SubjectRequest
): Promise<boolean> => {
  try {
    const res = await customAxios.put(`/subjects/${id}`, subject);
    return res.status === 200;
  } catch (error) {
    throw error;
  }
};

export const deleteSubject = async (id: number): Promise<boolean> => {
  try {
    const res = await customAxios.delete(`/subjects/${id}`);
    return res.status === 200;
  } catch (error) {
    throw error;
  }
};
