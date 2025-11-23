(async () => {
  try {
    // Create tables
    await run(`
      CREATE TABLE IF NOT EXISTS teachers (
        teacher_id TEXT PRIMARY KEY,
        name TEXT
      );
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS students (
        reg_no TEXT PRIMARY KEY,
        name TEXT
      );
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS quizzes (
        quiz_id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_id TEXT,
        title TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
      );
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS questions (
        question_id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        option_a TEXT,
        option_b TEXT,
        option_c TEXT,
        option_d TEXT,
        correct_option TEXT,
        explanation TEXT
      );
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS student_responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quiz_id INTEGER,
        reg_no TEXT,
        question_id INTEGER,
        selected_option TEXT,
        is_correct INTEGER,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),
        FOREIGN KEY (reg_no) REFERENCES students(reg_no),
        FOREIGN KEY (question_id) REFERENCES questions(question_id)
      );
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quiz_id INTEGER,
        reg_no TEXT,
        score INTEGER,
        total INTEGER,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),
        FOREIGN KEY (reg_no) REFERENCES students(reg_no)
      );
    `);

    // Sample teacher
    await insert(
      `INSERT OR IGNORE INTO teachers(teacher_id, name) VALUES(?, ?)`,
      ['T-1001', 'Alice Teacher']
    );

    // Sample students
    await insert(
      `INSERT OR IGNORE INTO students(reg_no, name) VALUES(?, ?)`,
      ['S-2001', 'Bob Student']
    );
    await insert(
      `INSERT OR IGNORE INTO students(reg_no, name) VALUES(?, ?)`,
      ['S-2002', 'Charlie Student']
    );

    // Sample questions (Corrected)
    const sampleQs = [
      ['What is the output of 1+1 in C?', '1', '2', '11', 'Error', 'B', 'Because 1+1 equals 2'],
      ['Which data structure uses LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 'Stack is LIFO'],
      ['What does HTML stand for?', 'Hyper Text Markup Language', 'Home Tool Markup', 'Hyperlinks Text', 'None', 'A', 'Full form'],
      ['Which is not a programming language?', 'Python', 'HTML', 'Java', 'C++', 'B', 'HTML is a markup language'],
      ['What is the time complexity of binary search?', 'O(n)', 'O(log n)', 'O(n log n)', 'O(1)', 'B', 'Binary search divides range by 2 each step'],
      ['Which SQL command adds data?', 'SELECT', 'UPDATE', 'INSERT', 'DELETE', 'C', 'INSERT adds data'],
      ['Which tag is used for paragraph in HTML?', '<p>', '<div>', '<span>', '<a>', 'A', 'Paragraph tag is p'],
      ['Which operator is used for assignment in JavaScript?', '=', '==', '===', '!=', 'A', 'Single equals assigns'],
      ['What is Git used for?', 'Version control', 'IDE', 'Database', 'Compiler', 'A', 'Git manages versions'],
      ['Which HTTP method is idempotent?', 'POST', 'PUT', 'DELETE', 'PATCH', 'C', 'DELETE is usually idempotent'],
      ['Which sorting is fastest on average?', 'Bubble', 'Insertion', 'Merge', 'Selection', 'C', 'Merge is O(n log n) average'],
      ['What is a primary key?', 'Unique identifier', 'Foreign key', 'Index', 'None', 'A', 'Primary key uniquely identifies rows']
    ];

    for (const q of sampleQs) {
      const [text, a, b, c, d, correct, explanation] = q;
      await insert(
        `INSERT INTO questions(text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES(?,?,?,?,?,?,?)`,
        [text, a, b, c, d, correct, explanation]
      );
    }

    console.log('Database initialized with sample data.');
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
