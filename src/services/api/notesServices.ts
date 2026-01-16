import { customAxios } from "../../config/customAxios";
import type { NoteModel } from "../../data/models/NoteModel";
import type {
  NoteQueryParams,
  NoteRequest,
} from "../../data/request/NoteRequest";

export const postNote = async (data: NoteRequest): Promise<boolean> => {
  try {
    const res = await customAxios.post("/notes", data);
    return res.status === 200;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedNotesByStudentAndSubject = async (
  params: NoteQueryParams
): Promise<NoteModel[]> => {
  try {
    if (Object.values(params).some((value) => value === undefined)) {
      throw new Error("Debe proporcionar todos los parámetros de consulta.");
    }

    const res = await customAxios.get<NoteModel[]>("/notes/search", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};
