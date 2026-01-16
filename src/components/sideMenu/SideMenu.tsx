import { useState, type JSX } from "react";
import "./sideMenu.css";
import type { PATHS } from "../../config/PATHS";
import { useNavigate } from "react-router";

export interface MenuOption {
  label: string;
  path: (typeof PATHS)[keyof typeof PATHS];
  icon?: JSX.Element;
}

export interface SideMenuProps {
  options: MenuOption[];
  title: string;
}

const SideMenu = ({ options, title }: SideMenuProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (path: (typeof PATHS)[keyof typeof PATHS]) => {
    navigate(path);
  };

  return (
    <div className={`sideMenu ${open ? "is-open" : "is-closed"}`}>
      <div className="sideMenu-header">
        {open && <h4 className="sideMenu-title">{title}</h4>}

        <button
          onClick={() => setOpen(!open)}
          className="sideMenu-toggle"
          aria-label="Toggle menu"
        >
          <i
            className={`bi ${
              open ? "bi-chevron-double-left" : "bi-chevron-right"
            }`}
          />
        </button>
      </div>

      <ul className="sideMenu-options">
        {options.map((option) => (
          <li
            key={option.path}
            className="sideMenu-option"
            onClick={() => navigateTo(option.path)}
          >
            <span className="sideMenu-icon">{option.icon}</span>
            {open && <span className="sideMenu-label">{option.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
