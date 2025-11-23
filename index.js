const express = require('express');
const cors = require('cors');
const jsonMiddleware = require('./middleware/jsonMiddleware');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes');
const teacherRoutes = require('./routes/teacher');


const app = express();
app.use(cors());
app.use(jsonMiddleware);


app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/teacher', teacherRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Backend running on port', PORT));