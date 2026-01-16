import { useEffect, useMemo, useState } from "react";
import useStudent from "../../hooks/useStudent";
import "./styles/viewStudents.css";
import Modal from "../../components/modal/Modal";
import CreateStudent from "../../forms/students/CreateStudent";
import UpdateStudent from "../../forms/students/UpdateStudent";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { PATHS } from "../../config/PATHS";

const PAGE_SIZE = 10;

const ViewStudentsPage = () => {
  const navigate = useNavigate();
  const {
    fetchAllStudents,
    addStudent,
    removeStudent,
    isLoading,
    students,
  } = useStudent();
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<{
    open: boolean;
    studentId: number | null;
  }>({
    open: false,
    studentId: null,
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const handleView = (id: number) => {
    navigate(PATHS.STUDENT_DETAILS.replace(":id", id.toString()));
  };

  const handleEdit = (id: number) => {
    setEditOpen({
      open: true,
      studentId: id,
    });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeStudent(id);
        Swal.fire("Eliminado", "El estudiante ha sido eliminado.", "success");
      }
    });
  };

  const handleSearch = () => {
    setPage(1);
  };

  const handleAddStudent = async (data: any) => {
    try {
      await addStudent(data);
      setCreateOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        window.alert("Error al crear el estudiante: " + error.message);
      }
      throw error;
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      `${s.name} ${s.lastname} ${s.dni}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [students, search]);

  const totalPages = Math.ceil(filteredStudents.length / PAGE_SIZE);

  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredStudents.slice(start, start + PAGE_SIZE);
  }, [filteredStudents, page]);

  return (
    <div className="students-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="title">Estudiantes</h2>
        <button
          className="students-add-button"
          onClick={() => setCreateOpen(true)}
        >
          <i className="bi bi-plus-lg" /> Agregar Estudiante
        </button>
      </div>

      <div className="students-search">
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o DNI"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>
          <i className="bi bi-search" />
        </button>
      </div>

      {isLoading && <p className="students-info">Cargando estudiantes…</p>}

      {!isLoading && paginatedStudents.length === 0 && (
        <p className="students-info">No hay estudiantes disponibles.</p>
      )}

      {paginatedStudents.length > 0 && (
        <>
          <table className="students-table">
            <thead>
              <tr>
                <th>Acciones</th>
                <th>ID</th>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Nacimiento</th>
              </tr>
            </thead>

            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student.id}>
                  <td className="actions">
                    <button
                      className="action-view"
                      onClick={() => handleView(student.id)}
                    >
                      <i className="bi bi-eye-fill" />
                    </button>
                    <button
                      className="action-edit"
                      onClick={() => handleEdit(student.id)}
                    >
                      <i className="bi bi-pencil-fill" />
                    </button>
                    <button
                      className="action-delete"
                      onClick={() => handleDelete(student.id)}
                    >
                      <i className="bi bi-trash-fill" />
                    </button>
                  </td>

                  <td>{student.id}</td>
                  <td>{student.dni}</td>
                  <td>{student.name}</td>
                  <td>{student.lastname}</td>
                  <td>{new Date(student.birthDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="students-pagination">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Anterior
            </button>

            <span>
              Página {page} de {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Agregar Estudiante"
      >
        <CreateStudent onCreate={handleAddStudent} />
      </Modal>

      <Modal
        open={editOpen.open}
        onClose={() => setEditOpen({ open: false, studentId: null })}
        title="Editar Estudiante"
      >
        <UpdateStudent studentId={editOpen.studentId!} />
      </Modal>
    </div>
  );
};

export default ViewStudentsPage;
