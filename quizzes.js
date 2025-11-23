const express = require('express');
const router = express.Router();
const db = require('./db'); // <- your sqlite instance

// Submit quiz
router.post('/:quizId/submit', async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const { reg_no, answers } = req.body;

    if (!reg_no || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'reg_no and answers required' });
    }

    let correctCount = 0;

    // Prepare insert query
    const insertStmt = db.prepare(`
      INSERT INTO student_responses
      (quiz_id, reg_no, question_id, selected_option, is_correct)
      VALUES (?, ?, ?, ?, ?)
    `);

    // For each answer — verify correctness
    await Promise.all(
      answers.map(a => new Promise((resolve, reject) => {

        db.get(`SELECT correct_option FROM questions WHERE question_id = ?`,
          [a.question_id],
          (err, row) => {
            if (err) return reject(err);

            const is_correct = (row && row.correct_option === a.selected_option) ? 1 : 0;
            if (is_correct) correctCount++;

            insertStmt.run(
              [quizId, reg_no, a.question_id, a.selected_option, is_correct],
              (err2) => err2 ? reject(err2) : resolve()
            );
          }
        );

      }))
    );

    insertStmt.finalize();

    // Insert summary result
    const total = answers.length;
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO results(quiz_id, reg_no, score, total)
         VALUES (?, ?, ?, ?)`,
        [quizId, reg_no, correctCount, total],
        err => err ? reject(err) : resolve()
      );
    });

    // Fetch review details
    db.all(
      `SELECT r.question_id, r.selected_option,
              q.correct_option, q.explanation, q.text
       FROM student_responses r
       JOIN questions q ON r.question_id = q.question_id
       WHERE r.quiz_id = ? AND r.reg_no = ?`,
      [quizId, reg_no],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
          score: correctCount,
          total,
          details: rows
        });
      }
    );

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
