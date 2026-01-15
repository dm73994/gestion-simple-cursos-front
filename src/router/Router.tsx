import { Navigate, Route, Routes } from 'react-router'
import ViewStudentsPage from '../pages/students/ViewStudentsPage'
import ViewSubjects from '../pages/subjects/ViewSubjects'
import MainLayout from '../layouts/MainLayout'

const Router = () => {
  return (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path="/students" element={<ViewStudentsPage />} />
            <Route path="/students/:id/subjects" element={<div>Student Subject Details Page</div>} />
            <Route path="/subjects" element={<ViewSubjects />} />
        </Route>
        <Route path="*" element={<Navigate to="/students" replace/>} />
    </Routes>
  )
}

export default Router