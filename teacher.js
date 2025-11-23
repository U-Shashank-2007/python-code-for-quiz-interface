const express = require('express');
const router = express.Router();
const db = require('../db');


// Create a quiz (teacher)
router.post('/create', (req,res)=>{
const { title, topic, timer_minutes, question_ids, teacher_id } = req.body; // question_ids: [1,2,...]
if(!title || !Array.isArray(question_ids) || !teacher_id) return res.status(400).json({ error: 'title, question_ids and teacher_id required' });
db.run(`INSERT INTO quizzes(title,topic,timer_minutes,status,created_by) VALUES(?,?,?,?,?)`, [title,topic || '', timer_minutes || 17, 'draft', teacher_id], function(err){
if(err) return res.status(500).json({ error: err.message });
const quizId = this.lastID;
const stmt = db.prepare(`INSERT INTO quiz_questions(quiz_id,question_id) VALUES(?,?)`);
question_ids.slice(0,50).forEach(qid=> stmt.run([quizId,qid]));
stmt.finalize((err)=>{
if(err) return res.status(500).json({ error: err.message });
res.json({ quiz_id: quizId });
});
});
});


// Publish quiz (set live)
router.post('/:quizId/publish', (req,res)=>{
const quizId = req.params.quizId;
db.run(`UPDATE quizzes SET status = 'live' WHERE quiz_id = ?`, [quizId], function(err){
if(err) return res.status(500).json({ error: err.message });
res.json({ ok: true });
});
});


// Get list of all quizzes (teacher)
router.get('/all', (req,res)=>{
db.all(`SELECT quiz_id,title,topic,timer_minutes,status,created_at FROM quizzes ORDER BY created_at DESC`, [], (err,rows)=>{
if(err) return res.status(500).json({ error: err.message });
res.json(rows);
});
});


// View performance for a quiz
router.get('/:quizId/performance', (req,res)=>{
const quizId = req.params.quizId;
db.all(`SELECT r.reg_no, s.name, r.score, r.total, r.submitted_at FROM results r JOIN students s ON r.reg_no = s.reg_no WHERE r.quiz_id = ? ORDER BY r.score DESC`, [quizId], (err,rows)=>{
if(err) return res.status(500).json({ error: err.message });
res.json(rows);
});
});


// Get questions bank
router.get('/questions/bank', (req,res)=>{
db.all(`SELECT question_id, text, option_a, option_b, option_c, option_d, correct_option FROM questions ORDER BY question_id ASC`, [], (err,rows)=>{
if(err) return res.status(500).json({ error: err.message });
res.json(rows);
});
});


module.exports = router;