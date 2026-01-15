import { useState } from "react";
import Modal from "../modal/Modal";
import "./sideMenuMobile.css";
import type { MenuOption } from "../sideMenu/SideMenu";
import type { PATHS } from "../../config/PATHS";
import { useNavigate } from "react-router";

interface SideMenuMobileProps {
  options: MenuOption[];
  title: string;
}

const SideMenuMobile = ({ options, title }: SideMenuMobileProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClickOption = (path: PATHS) => {
    navigate(path, { replace: true });
    handleClose();
  };

  return (
    <div>
      <div className="bubble-menu" onClick={handleOpen}>
        <i
          className="bi bi-list"
          style={{
            fontSize: "1.5rem",
          }}
        ></i>
      </div>
      <Modal open={open} onClose={handleClose} title={title}>
        <div className="sideMenuMobile">
          <ul className="sideMenuMobile-options">
            {options.map((option) => (
              <li
                key={option.path}
                className="sideMenuMobile-option"
                onClick={() => handleClickOption(option.path)}
              >
                {option.icon && <>{option.icon}</>}
                <p>{option.label}</p>
                <i className="bi bi-chevron-double-right"></i>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default SideMenuMobile;
