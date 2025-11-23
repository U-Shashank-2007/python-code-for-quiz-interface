import React from 'react'


export default function QuestionCard({q,index,selected,onSelect}){
return (
<div className="card question">
<div><strong>Q{index+1}.</strong> {q.text}</div>
<div>
<label><input type="radio" name={q.question_id} checked={selected==='A'} onChange={()=>onSelect(q.question_id,'A')} /> A. {q.option_a}</label>
</div>
<div>
<label><input type="radio" name={q.question_id} checked={selected==='B'} onChange={()=>onSelect(q.question_id,'B')} /> B. {q.option_b}</label>
</div>
<div>
<label><input type="radio" name={q.question_id} checked={selected==='C'} onChange={()=>onSelect(q.question_id,'C')} /> C. {q.option_c}</label>
</div>
<div>
<label><input type="radio" name={q.question_id} checked={selected==='D'} onChange={()=>onSelect(q.question_id,'D')} /> D. {q.option_d}</label>
</div>
</div>
)
}