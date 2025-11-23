import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { teacherLogin } from '../api'


export default function TeacherLogin(){
const [id,setId] = useState('');
const [name,setName] = useState('');
const nav = useNavigate();


const handle = async ()=>{
if(!id||!name) return alert('fill both');
const resp = await teacherLogin(id,name);
if(resp.error) return alert(resp.error);
localStorage.setItem('teacher', JSON.stringify({ teacher_id: resp.teacher_id, name: resp.name }));
nav('/teacher/dashboard');
}


return (
<div className="card">
<h3>Teacher Login</h3>
<div>
<label>Teacher ID</label><br />
<input value={id} onChange={e=>setId(e.target.value)} />
</div>
<div>
<label>Name</label><br />
<input value={name} onChange={e=>setName(e.target.value)} />
</div>
<div style={{marginTop:8}}>
<button className="button btn-primary" onClick={handle}>Login</button>
</div>
</div>
)
}