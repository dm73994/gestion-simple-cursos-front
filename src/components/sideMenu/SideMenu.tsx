import { useState, type JSX } from 'react';
import './sideMenu.css'
import type { PATHS } from '../../config/PATHS';

interface MenuOption {
  label: string;
  path: PATHS;
  icon?: JSX.Element;
}

interface SideMenuProps {
  options: MenuOption[];
  title: string;
}

const SideMenu = ({ options, title }: SideMenuProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sideMenu">
      <div>
        <h4>{title}</h4>
      </div>

      <ul>
        {options.map((option) => (
          <li key={option.path}>
            {option.icon && <span>{option.icon}</span>}
            <a href={option.path}>{option.label}</a>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default SideMenu