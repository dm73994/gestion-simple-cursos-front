import SideMenu from "../components/sideMenu/SideMenu";
import { Outlet, useLocation } from "react-router";
import "./mainLayout.css";
import { PATHS } from "../config/PATHS";
import SideMenuMobile from "../components/sideMenuMobile/SideMenuMobile";
import useMediaQuery from "../hooks/useMediaQuery";

const MainLayout = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const path = useLocation().pathname.split("/");

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
        <div className="breadcrumb">
          {path.length > 2 && (
            <button
              className="breadcrumb-back"
              onClick={() => window.history.back()}
              aria-label="Volver"
            >
              <i className="bi bi-arrow-left" />
            </button>
          )}

          <nav className="breadcrumb-path">
            {path.map((item, index) => (
              <span key={index} className="breadcrumb-item">
                {item}
                {index < path.length - 1 && (
                  <span className="breadcrumb-separator">/</span>
                )}
              </span>
            ))}
          </nav>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
