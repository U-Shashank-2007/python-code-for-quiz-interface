import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { studentLogin } from '../api'


export default function StudentLogin(){
const [reg,setReg] = useState('');
const [name,setName] = useState('');
const nav = useNavigate();


const handle = async ()=>{
if(!reg||!name) return alert('fill both');
const resp = await studentLogin(reg,name);
if(resp.error) return alert(resp.error);
// save to localStorage
localStorage.setItem('student', JSON.stringify({ reg_no: resp.reg_no, name: resp.name }));
nav('/student/dashboard');
}


return (
<div className="card">
<h3>Student Login</h3>
<div>
<label>Registration Number</label><br />
<input value={reg} onChange={e=>setReg(e.target.value)} />
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