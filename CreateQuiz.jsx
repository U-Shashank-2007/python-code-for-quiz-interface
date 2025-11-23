import React, {useEffect, useState} from 'react'
const [timer,setTimer] = useState(17);
const [selected,setSelected] = useState([]);


useEffect(()=>{ fetchQuestions(); },[]);
async function fetchQuestions(){ const q = await getQuestionsBank(); setQuestions(q); }


function toggle(id){ setSelected(s=> s.includes(id) ? s.filter(x=>x!==id) : [...s,id]); }


async function handleCreate(){
const t = JSON.parse(localStorage.getItem('teacher'));
if(!t) return nav('/teacher');
if(!title||selected.length<1) return alert('provide title and select questions');
const payload = { title,topic,timer_minutes:timer, question_ids: selected, teacher_id: t.teacher_id };
const res = await createQuiz(payload);
if(res.error) return alert(res.error);
alert('Quiz created with id '+res.quiz_id);
nav('/teacher/dashboard');
}


return (
<div>
<div className="card">
<h3>Create Quiz</h3>
<div>
<label>Title</label><br />
<input value={title} onChange={e=>setTitle(e.target.value)} />
</div>
<div>
<label>Topic</label><br />
<input value={topic} onChange={e=>setTopic(e.target.value)} />
</div>
<div>
<label>Timer (minutes)</label><br />
<input type="number" value={timer} onChange={e=>setTimer(Number(e.target.value))} />
</div>
</div>


<div className="card">
<h4>Question Bank (select questions)</h4>
{questions.map(q=> (
<div key={q.question_id} className="card">
<div><input type="checkbox" checked={selected.includes(q.question_id)} onChange={()=>toggle(q.question_id)} /> {q.text}</div>
<div>A. {q.option_a} | B. {q.option_b} | C. {q.option_c} | D. {q.option_d}</div>
</div>
))}
<div style={{marginTop:8}}>
<button className="button btn-primary" onClick={handleCreate}>Create Quiz</button>
</div>
</div>
</div>
)
