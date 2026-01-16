import React from "react";
import type { NoteModel } from "../data/models/NoteModel";
import {
  getPaginatedNotesByStudentAndSubject,
  postNote,
} from "../services/api/notesServices";
import type { NoteRequest } from "../data/request/NoteRequest";

const useNote = () => {
  const [notes, setNotes] = React.useState<NoteModel[]>([]);
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchNotes = async (
    studentId: number,
    subjectId: number,
    page: number = 0
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getPaginatedNotesByStudentAndSubject({
        studentId,
        subjectId,
        page,
      });
      setNotes(res);
      return res;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async (data: NoteRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await postNote(data);
      return res;
    } catch (error) {
      throw error;
    } finally {
        setIsLoading(false);
    }
  };

  return {
    notes,
    error,
    isLoading,
    fetchNotes,
    createNote,
  };
};

export default useNote;
