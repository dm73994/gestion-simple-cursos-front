import { useEffect, useState } from "react";
import useSubject from "../../hooks/useSubject";
import "./styles/viewSubjects.css";
import Modal from "../../components/modal/Modal";
import CreateSubject from "../../forms/subjects/CreateSubject";
import type { SubjectRequest } from "../../data/request/SubjectRequest";
import Swal from "sweetalert2";
import EditSubject from "../../forms/subjects/EditSubject";

const ViewSubjects = () => {
  const {
    subjects,
    error,
    isLoading,
    fetchAllSubjects,
    addSubject,
    removeSubject,
    editSubject,
  } = useSubject();
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState<{
    open: boolean;
    subjectId: number | null;
  }>({
    open: false,
    subjectId: null,
  });

  useEffect(() => {
    fetchAllSubjects();
  }, []);

  const handleAddSubject = async (data: SubjectRequest) => {
    try {
      await addSubject(data);
      setOpenCreate(false);
      Swal.fire("Éxito", "La materia ha sido creada.", "success");
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handleDeleteSubject = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeSubject(id);
        Swal.fire("Eliminado", "La materia ha sido eliminada.", "success");
      }
    });
  };

  const handleUpdateSubject = async (data: SubjectRequest) => {
    try {
      if (openEdit.subjectId !== null) {
        await editSubject(openEdit.subjectId, data);
        setOpenEdit({ open: false, subjectId: null });
        Swal.fire("Éxito", "La materia ha sido actualizada.", "success");
      }
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Materias</h2>
        <button onClick={() => setOpenCreate(true)}>
          <i className="bi bi-plus-lg" />
          Agregar Materia
        </button>
      </div>

      {isLoading && <p>Cargando materias…</p>}

      {!isLoading && subjects.length === 0 && (
        <p>No hay materias disponibles.</p>
      )}

      {!isLoading &&
        subjects.length > 0 &&
        subjects.map((subject) => (
          <div key={subject.id} className="subject-card">
            <h3 className="subject-card-title">{subject.name}</h3>

            <div className="header">
              <p className="caption1">
                Código
                <span> · </span>
                <span className="caption2">{subject.code}</span>
              </p>

              <p className="caption1">
                Créditos
                <span> · </span>
                <span className="caption2">{subject.credits}</span>
              </p>
            </div>

            <div className="actions">
              <button
                onClick={() =>
                  setOpenEdit({ open: true, subjectId: subject.id })
                }
                className="action-edit"
              >
                <i className="bi bi-pencil-fill" /> Editar
              </button>
              <button
                onClick={() => handleDeleteSubject(subject.id)}
                className="action-delete"
              >
                <i className="bi bi-trash-fill" /> Eliminar
              </button>
            </div>
          </div>
        ))}

      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <CreateSubject onCreate={handleAddSubject} />
      </Modal>

      <Modal
        open={openEdit.open}
        onClose={() => setOpenEdit({ open: false, subjectId: null })}
      >
        <EditSubject
          subjectId={openEdit.subjectId!}
          onUpdate={handleUpdateSubject}
        />
      </Modal>
    </div>
  );
};

export default ViewSubjects;
