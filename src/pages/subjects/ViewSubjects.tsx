import { useEffect, useState } from "react";
import useSubject from "../../hooks/useSubject";
import "./styles/viewSubjects.css";
import Modal from "../../components/modal/Modal";
import CreateSubject from "../../forms/subjects/CreateSubject";
import type { SubjectRequest } from "../../data/request/SubjectRequest";
import Swal from "sweetalert2";
import EditSubject from "../../forms/subjects/EditSubject";
import SubjectCard from "./components/SubjectCard";

const ViewSubjects = () => {
  const {
    subjects,
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
        <button onClick={() => setOpenCreate(true)} className="btn-primary">
          <i className="bi bi-plus-lg" />
          Agregar Materia
        </button>
      </div>

      {isLoading && <p>Cargando materias…</p>}

      {!isLoading && subjects.length === 0 && (
        <p>No hay materias disponibles.</p>
      )}

      <div className="subjects-list">
        {!isLoading &&
          subjects.length > 0 &&
          subjects.map((subject) => (
            <SubjectCard
              onDelete={(id: number) => {
                handleDeleteSubject(id);
              }}
              onEdit={(id: number) => {
                setOpenEdit({ open: true, subjectId: id });
              }}
              subject={subject}
              key={subject.id}
            />
          ))}
      </div>

      <Modal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Crear Nueva Materia"
      >
        <CreateSubject onCreate={handleAddSubject} />
      </Modal>

      {openEdit.subjectId && (
        <Modal
          open={openEdit.open}
          onClose={() => setOpenEdit({ open: false, subjectId: null })}
          title="Editar Materia"
        >
          <EditSubject
            subjectId={openEdit.subjectId!}
            onUpdate={handleUpdateSubject}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewSubjects;
