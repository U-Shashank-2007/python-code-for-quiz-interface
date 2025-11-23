import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import StudentLogin from './pages/StudentLogin'
import StudentDashboard from './pages/StudentDashboard'
import LiveExam from './pages/LiveExam'
import PastExams from './pages/PastExams'
import TeacherLogin from './pages/TeacherLogin'
import TeacherDashboard from './pages/TeacherDashboard'
import CreateQuiz from './pages/CreateQuiz'


function App(){
return (
<BrowserRouter>
<div className="container">
<div className="header">
<h2>Quiz Module</h2>
<nav>
<Link to="/student">Student</Link> | <Link to="/teacher">Teacher</Link>
</nav>
</div>
<Routes>
<Route path="/" element={<StudentLogin/>} />
<Route path="/student" element={<StudentLogin/>} />
<Route path="/student/dashboard" element={<StudentDashboard/>} />
<Route path="/student/exam/:quizId" element={<LiveExam/>} />
<Route path="/student/past" element={<PastExams/>} />
<Route path="/teacher" element={<TeacherLogin/>} />
<Route path="/teacher/dashboard" element={<TeacherDashboard/>} />
<Route path="/teacher/create" element={<CreateQuiz/>} />
</Routes>
</div>
</BrowserRouter>
)
}


createRoot(document.getElementById('root')).render(<App />)