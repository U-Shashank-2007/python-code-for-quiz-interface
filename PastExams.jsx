import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import { getAttempt } from '../api'


export default function PastExams(){
const [rows,setRows] = useState([]);
const loc = useLocation();
const params = new URLSearchParams(loc.search);
const quizId = params.get('quiz');
const reg = params.get('reg');


useEffect(()=>{
if(quizId && reg){
(async ()=>{
const r = await getAttempt(quizId, reg);
setRows(r);
})();
}
},[]);


if(!quizId) return <div>No attempt selected</div>;
return (
<div>
<h3>Attempt</h3>
{rows.map((r,i)=> (
<div key={i} className="card">
<div><strong>Q:</strong> {r.text}</div>
<div><strong>Your:</strong> {r.selected_option}</div>
<div><strong>Correct:</strong> {r.correct_option}</div>
<div><strong>Explanation:</strong> {r.explanation}</div>
</div>
))}
</div>
)
}