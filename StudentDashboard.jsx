import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getLiveQuizzes, getStudentResults } from '../api'


export default function StudentDashboard(){
const nav = useNavigate();
const [student,setStudent] = useState(null);
const [live,setLive] = useState([]);
const [past,setPast] = useState([]);


useEffect(()=>{
const s = JSON.parse(localStorage.getItem('student'));
if(!s) return nav('/student');
setStudent(s);
fetchLive();
fetchPast(s.reg_no);
},[]);


async function fetchLive(){ const l = await getLiveQuizzes(); setLive(l); }
async function fetchPast(reg_no){ const p = await getStudentResults(reg_no); setPast(p); }


if(!student) return null;
return (
<div>
<div className="card">
<h3>Welcome, {student.name}</h3>
<div><button className="button" onClick={()=>{ localStorage.removeItem('student'); nav('/student');}}>Logout</button></div>
</div>


<div className="card">
<h4>Live Exams</h4>
{live.length===0 && <div>No live exams</div>}
{live.map(q=> (
<div key={q.quiz_id} className="card">
<div><strong>{q.title}</strong> - {q.topic}</div>
<div>Duration: {q.timer_minutes} minutes</div>
<div style={{marginTop:8}}>
<Link to={`/student/exam/${q.quiz_id}`} className="button btn-primary">Start Exam</Link>
</div>
</div>
))}
</div>


<div className="card">
<h4>Past Exams</h4>
{past.length===0 && <div>No past attempts</div>}
{past.map(p=> (
<div key={p.id} className="card">
<div>{p.title} - Score: {p.score}/{p.total}</div>
<div>{new Date(p.submitted_at).toLocaleString()}</div>
<div style={{marginTop:8}}>
<button className="button btn-ghost" onClick={()=>nav(`/student/past?quiz=${p.quiz_id}&reg=${student.reg_no}`)}>View</button>
</div>
</div>
))}
</div>
</div>
)
}