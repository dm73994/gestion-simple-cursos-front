import { useState, type JSX } from "react";
import "./sideMenu.css";
import type { PATHS } from "../../config/PATHS";
import { useNavigate } from "react-router";

export interface MenuOption {
  label: string;
  path: typeof PATHS[keyof typeof PATHS];
  icon?: JSX.Element;
}

export interface SideMenuProps {
  options: MenuOption[];
  title: string;
}

const SideMenu = ({ options, title }: SideMenuProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (path: typeof PATHS[keyof typeof PATHS]) => {
    navigate(path);
  };

  return (
    <div className={`sideMenu ${open ? "open" : "close"}`}>
      <div className="sideMenu-header">
        {open && <h4>{title}</h4>}
        <button onClick={() => setOpen(!open)} className={"sideMenu-toggle"}>
          {open ? (
            <i className="bi bi-chevron-double-left"></i>
          ) : (
            <i className="bi bi-chevron-right"></i>
          )}
        </button>
      </div>

      <ul className="sideMenu-options">
        {options.map((option) => (
          <li
            key={option.path}
            className="sideMenu-option"
            onClick={() => navigateTo(option.path)}
          >
            {option.icon && <>{option.icon}</>}
            {open && <p>{option.label}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
