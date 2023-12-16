import React from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/home/Home'
import GuideList from './pages/guidelist/Guidelist'
import Register from './pages/register/Register'
import Admin from './pages/Login/Admin'
import Staff from './pages/Login/Staff'
import Student from './pages/Login/Student'
import AdminDashboard from './scences/Dashboard/AdminDashboard'
import StaffDashboard from './scences/Dashboard/StaffDashboard'
import StudentDashboard from './scences/Dashboard/StudentDashboard'
import Createstaff from './scences/form/Createstaff'
import Createstudent from './scences/form/Createstudent'
import PPTUpload from './scences/ReviewOptions/PPTUpload'
import ReportUpload from './scences/ReviewOptions/ReportUpload'
import StudentReviewForm from './scences/ReviewOptions/StudentReviewForm'
import StudentInfoAdmin from './scences/studentinfo/StudentInfoAdmin'
import StudentInfoStaff from './scences/studentinfo/StudentInfoStaff'
import StaffInfoAdmin from './scences/staffinfoadmin/StaffInfoAdmin'
import Pptdownloadadmin from './scences/DownloadAdmin/Pptdownloadadmin'
import Reportdownloadadmin from './scences/DownloadAdmin/Reportdownloadadmin'
import Reviewdownloadadmin from './scences/DownloadAdmin/Reviewdownloadadmin'
import Pptdownloadstaff from './scences/DownloadStaff/Pptdownloadstaff'
import Reportdownloadstaff from './scences/DownloadStaff/Reportdownloadstaff'
import Reviewdownloadstaff from './scences/DownloadStaff/Reviewdownloadstaff'
import ProjectRegister from './scences/Register/ProjectRegister'


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/guide-list' element={<GuideList />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin-login' element={<Admin />} />
        <Route path='/staff-login' element={<Staff />} />
        <Route path='/student-login' element={<Student />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/staff-dashboard' element={<StaffDashboard />} />
        <Route path='/student-dashboard' element={<StudentDashboard />} />
        <Route path='/create-staff' element={<Createstaff />} />
        <Route path='/create-student' element={<Createstudent />} />
        <Route path='/student-upload-ppt' element={<PPTUpload />} />
        <Route path='/student-upload-report' element={<ReportUpload />} />
        <Route path='/student-review-form' element={<StudentReviewForm />} />
        <Route path='/student-data-admin' element={<StudentInfoAdmin />} />
        <Route path='/student-data-staff' element={<StudentInfoStaff />} />
        <Route path='/staff-data-admin' element={<StaffInfoAdmin />} />
        <Route path='/admin-ppt' element={<Pptdownloadadmin />} />
        <Route path='/admin-reports' element={<Reportdownloadadmin />} />
        <Route path='/admin-review-form' element={<Reviewdownloadadmin />} />
        <Route path='/staff-ppt' element={<Pptdownloadstaff />} />
        <Route path='/staff-reports' element={<Reportdownloadstaff />} />
        <Route path='/staff-review-form' element={<Reviewdownloadstaff />} />
        <Route path='/register-project' element={<ProjectRegister />} />
      </Routes>
    </Router>
    </>
  )
}

export default App