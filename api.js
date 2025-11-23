const API = 'http://localhost:4000/api';


export async function studentLogin(reg_no,name){
const r = await fetch(`${API}/auth/student/login`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({reg_no,name}) });
return r.json();
}
export async function teacherLogin(teacher_id,name){
const r = await fetch(`${API}/auth/teacher/login`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({teacher_id,name}) });
return r.json();
}
export async function getLiveQuizzes(){
const r = await fetch(`${API}/quizzes/live`); return r.json();
}
export async function getQuiz(quizId){ const r = await fetch(`${API}/quizzes/${quizId}`); return r.json(); }
export async function submitQuiz(quizId,payload){ const r = await fetch(`${API}/quizzes/${quizId}/submit`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); return r.json(); }
export async function getStudentResults(reg_no){ const r = await fetch(`${API}/quizzes/student/${reg_no}/results`); return r.json(); }
export async function getAttempt(quizId,reg_no){ const r = await fetch(`${API}/quizzes/${quizId}/student/${reg_no}/attempt`); return r.json(); }
export async function createQuiz(data){ const r = await fetch(`${API}/teacher/create`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); return r.json(); }
export async function publishQuiz(quizId){ const r = await fetch(`${API}/teacher/${quizId}/publish`,{method:'POST'}); return r.json(); }
export async function getAllQuizzes(){ const r = await fetch(`${API}/teacher/all`); return r.json(); }
export async function getQuestionsBank(){ const r = await fetch(`${API}/teacher/questions/bank`); return r.json(); }
export async function getPerformance(quizId){ const r = await fetch(`${API}/teacher/${quizId}/performance`); return r.json(); }