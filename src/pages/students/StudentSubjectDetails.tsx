import { useParams } from "react-router";
import useStudent from "../../hooks/useStudent";
import useSubject from "../../hooks/useSubject";
import useNote from "../../hooks/useNote";
import { useEffect, useState } from "react";
import type { StudentModel } from "../../data/models/StudentModel";
import type { NoteQueryParams } from "../../data/request/NoteRequest";
import Swal from "sweetalert2";
import "./styles/StudentDetails.css";

const StudentSubjectDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<StudentModel>();
  const [queryParams, setQueryParams] = useState<NoteQueryParams>({
    studentId: id ? Number(id) : undefined,
    subjectId: undefined,
    page: 0,
  });
  const {
    fetchStudent,
    isLoading: isStudentLoading,
    error: studentError,
  } = useStudent();
  const {
    subjects,
    fetchAllSubjects,
  } = useSubject();
  const {
    notes,
    error: notesError,
    isLoading: isNotesLoading,
    fetchNotes,
    createNote,
  } = useNote();

  useEffect(() => {
    if (id) {
      fetchStudent(Number(id)).then(setStudent);
      fetchAllSubjects();
    }
  }, [id]);

  const handleSearchNotes = async (subjectId: number) => {
    try {
      const params: NoteQueryParams = {
        page: queryParams.page,
        studentId: queryParams.studentId,
        subjectId: subjectId,
      };

      if (params.studentId === undefined || params.subjectId === undefined) {
        throw new Error("Debe proporcionar todos los parámetros de consulta.");
      }

      await fetchNotes(
        params.studentId,
        subjectId,
        params.page ? params.page : 0
      );
      setQueryParams(params);
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handleAddNote = async () => {
    const result = await Swal.fire({
      title: "Agregar Nota",
      input: "number",
      inputLabel: "Ingrese el valor de la nota",
      inputAttributes: {
        min: "0",
        max: "5",
        step: "0.1",
      },
      showCancelButton: true,
      confirmButtonText: "Agregar",
      preConfirm: (value) => {
        if (value === null || value === undefined || value === "") {
          Swal.showValidationMessage("El valor de la nota es requerido.");
          return false;
        }

        const num = Number(value);
        if (isNaN(num) || num < 0 || num > 5) {
          Swal.showValidationMessage("La nota debe estar entre 0 y 5.");
          return false;
        }

        return num;
      },
    });

    if (
      !result.isConfirmed ||
      queryParams.studentId === undefined ||
      queryParams.subjectId === undefined
    ) {
      return;
    }

    try {
      await createNote({
        value: result.value,
        studentId: queryParams.studentId,
        subjectId: queryParams.subjectId,
      });

      Swal.fire("Éxito", "La nota ha sido agregada.", "success");

      await fetchNotes(
        queryParams.studentId,
        queryParams.subjectId,
        queryParams.page ?? 0
      );
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  return (
    <div className="student-subject-container">
      {isStudentLoading && (
        <p className="state-text">Cargando detalles del estudiante...</p>
      )}

      {!isStudentLoading && studentError && (
        <p className="state-text error">
          Error al cargar el estudiante: {studentError}
        </p>
      )}

      {student && (
        <>
          <header className="student-header">
            <h2 className="student-name">
              {student.name} {student.lastname}
            </h2>
            <div className="student-meta">
              <span>Identificación: {student.dni}</span>
              <span>
                Fecha de nacimiento:{" "}
                {new Date(student.birthDate).toLocaleDateString()}
              </span>
            </div>
          </header>

          <section className="subjects-section">
            <h3 className="section-title">Materias</h3>

            {subjects.length === 0 && (
              <p className="state-text">No existen materias asignadas.</p>
            )}

            <div className="subjects-tabs">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  className={`subject-tab ${
                    queryParams.subjectId === subject.id ? "active" : ""
                  }`}
                  onClick={() => handleSearchNotes(subject.id)}
                >
                  {subject.name}
                </button>
              ))}
            </div>

            <div className="notes-section">
              {queryParams.subjectId && (
                <div className="notes-actions">
                  <button className="add-note-btn" onClick={handleAddNote}>
                    <i className="bi bi-plus-circle-fill" />
                    <span>Agregar nota</span>
                  </button>
                </div>
              )}

              {isNotesLoading && (
                <p className="state-text">Cargando notas...</p>
              )}

              {!isNotesLoading && notesError && (
                <p className="state-text error">
                  Error al cargar las notas: {notesError.message}
                </p>
              )}

              {!isNotesLoading &&
                notes.length === 0 &&
                queryParams.subjectId && (
                  <p className="state-text">No hay notas registradas.</p>
                )}

              <div className="notes-grid">
                {notes.map((note) => (
                  <div key={note.id} className="note-card">
                    <p className="note-value">{note.value}</p>
                    <p className="note-date">
                      {new Date(note.registerDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default StudentSubjectDetails;
