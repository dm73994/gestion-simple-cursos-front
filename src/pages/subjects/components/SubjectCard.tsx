import type { SubjectModel } from "../../../data/models/SubjectModel";

interface SubjectCardProps {
    subject: SubjectModel;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const SubjectCard = ({ subject, onDelete, onEdit }: SubjectCardProps) => {
  return (
    <div key={subject.id} className="subject-card">
      <div className="subject-card-header">
        <h3 className="subject-card-title">{subject.name}</h3>

        <div className="subject-card-meta">
          <p className="meta-item">
            Código <span className="meta-sep">·</span>
            <span className="meta-value">{subject.code}</span>
          </p>

          <p className="meta-item">
            Créditos <span className="meta-sep">·</span>
            <span className="meta-value">{subject.credits}</span>
          </p>
        </div>
      </div>

      <div className="subject-card-actions">
        <button
          onClick={() => onEdit(subject.id)}
          className="btn-edit"
        >
          <i className="bi bi-pencil-fill" /> Editar
        </button>

        <button
          onClick={() => onDelete(subject.id)}
          className="btn-delete"
        >
          <i className="bi bi-trash-fill" /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;
