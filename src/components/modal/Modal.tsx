import "./modal.css";

interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  open: boolean;
  onClose: () => void;
}

const Modal = ({ children, title, open, onClose }: ModalProps) => {
  return (
    <div className={`modal ${!open && "close"}`}>
      <div className="modal-container">
        <div className="modal-header">
          <h3>{title}</h3>
          <i
            className="bi bi-x-circle"
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#FE265D",
            }}
            onClick={() => {
              onClose();
            }}
          ></i>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
