import SideMenu from "../components/sideMenu/SideMenu";
import { Outlet } from "react-router";
import "./mainLayout.css";
import { PATHS } from "../config/PATHS";
import SideMenuMobile from "../components/sideMenuMobile/SideMenuMobile";
import useMediaQuery from "../hooks/useMediaQuery";

const MainLayout = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const menuOptions = [
    {
      label: "Alumnos",
      path: PATHS.STUDENTS,
      icon: <i className="bi bi-people-fill"></i>,
    },
    {
      label: "Materias",
      path: PATHS.SUBJECTS,
      icon: <i className="bi bi-journal-richtext"></i>,
    },
  ];

  return (
    <div className="mainLayout">
      <div className="layoutMenu">
        {!isMobile.matches ? (
          <SideMenu options={menuOptions} title="Menu" />
        ) : (
          <SideMenuMobile options={menuOptions} title="Menu" />
        )}
      </div>
      <div className="layoutContent">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
