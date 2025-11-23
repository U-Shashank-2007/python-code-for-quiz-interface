const express = require('express');
const router = express.Router();
const db = require('../db');

// ------------------ Student Login ------------------
// Auto-register student if not found
router.post('/student/login', (req, res) => {
  const { reg_no, name } = req.body;

  if (!reg_no || !name)
    return res.status(400).json({ error: 'reg_no and name required' });

  db.get(
    `SELECT reg_no, name FROM students WHERE reg_no = ?`,
    [reg_no],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      // Already exists → login
      if (row) return res.json(row);

      // Register
      db.run(
        `INSERT INTO students(reg_no, name) VALUES (?, ?)`,
        [reg_no.trim(), name.trim()],
        function (err2) {
          if (err2) return res.status(500).json({ error: err2.message });
          return res.json({ reg_no, name });
        }
      );
    }
  );
});


// ------------------ Teacher Login ------------------
// If teacher not exists, auto register
router.post('/teacher/login', (req, res) => {
  const { teacher_id, name } = req.body;

  if (!teacher_id || !name)
    return res.status(400).json({ error: 'teacher_id and name required' });

  db.get(
    `SELECT teacher_id, name FROM teachers WHERE teacher_id = ?`,
    [teacher_id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      // Exists: return account
      if (row) return res.json(row);

      // Register new teacher
      db.run(
        `INSERT INTO teachers(teacher_id, name) VALUES (?, ?)`,
        [teacher_id.trim(), name.trim()],
        function (err2) {
          if (err2) return res.status(500).json({ error: err2.message });
          return res.json({ teacher_id, name });
        }
      );
    }
  );
});


module.exports = router;
