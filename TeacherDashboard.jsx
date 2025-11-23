import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllQuizzes, getQuestionsBank, publishQuiz, getPerformance } from '../api'


export default function TeacherDashboard(){
const nav = useNavigate();
const [teacher,setTeacher] = useState(null);
const [quizzes,setQuizzes] = useState([]);


useEffect(()=>{
const t = JSON.parse(localStorage.getItem('teacher'));
if(!t) return nav('/teacher');
setTeacher(t);
fetchQuizzes();
},[]);


async function fetchQuizzes(){ const q = await getAllQuizzes(); setQuizzes(q); }
async function doPublish(id){ await publishQuiz(id); alert('Published'); fetchQuizzes(); }
async function viewPerf(id){ const p = await getPerformance(id); window.alert(JSON.stringify(p,null,2)); }


if(!teacher) return null;
return (
<div>
<div className="card">
<h3>Welcome, {teacher.name}</h3>
<div><Link to="/teacher/create" className="button btn-primary">Create Quiz</Link></div>
</div>


<div className="card">
<h4>Quizzes</h4>
{quizzes.map(q=> (
<div key={q.quiz_id} className="card">
<div><strong>{q.title}</strong> - {q.topic} ({q.status})</div>
<div>Timer: {q.timer_minutes} mins</div>
<div style={{marginTop:8}}>
{q.status!=='live' && <button className="button btn-primary" onClick={()=>doPublish(q.quiz_id)}>Publish Live</button>}
<button className="button btn-ghost" onClick={()=>viewPerf(q.quiz_id)}>View Performance</button>
</div>
</div>
))}
</div>
</div>
)
}