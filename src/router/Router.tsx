import { Navigate, Route, Routes } from 'react-router'
import ViewStudentsPage from '../pages/students/ViewStudentsPage'
import ViewSubjects from '../pages/subjects/ViewSubjects'
import MainLayout from '../layouts/MainLayout'
import { PATHS } from '../config/PATHS'
import StudentSubjectDetails from '../pages/students/StudentSubjectDetails'

const Router = () => {
  return (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path={PATHS.STUDENTS} element={<ViewStudentsPage />} />
            <Route path={PATHS.STUDENT_DETAILS} element={<StudentSubjectDetails />} />
            <Route path={PATHS.SUBJECTS} element={<ViewSubjects />} />
        </Route>
        <Route path="*" element={<Navigate to="/students" replace/>} />
    </Routes>
  )
}

export default Router