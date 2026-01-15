import SideMenu from '../components/sideMenu/SideMenu'
import { Outlet } from 'react-router'
import './mainLayout.css'
import { PATHS } from '../config/PATHS'

const MainLayout = () => {
  return (
    <div className='mainLayout'>
      <div className="layoutMenu">
        <SideMenu
          options={[
            { label: 'Home', path: PATHS.HOME },
            { label: 'Students', path: PATHS.STUDENTS },
            { label: 'Subjects', path: PATHS.SUBJECTS },
          ]}
          title="Menu"
        />
      </div>
        <div className="layoutContent">MainLayout

        <Outlet />
        </div>
    </div>
  )
}

export default MainLayout