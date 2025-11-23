import React, { useEffect, useState, useRef, useCallback } from "react";
import { submitQuiz } from "../api";      // <-- your api call
import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";

export default function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  const timerRef = useRef(null);
  const nav = useNavigate();

  //---------------- LOAD QUIZ ----------------//
  useEffect(() => {
    (async () => {
      const data = await fetchQuiz(); // replace with your API
      setQuiz(data.quiz);
      setQuestions(data.questions);
      setTimeLeft((data.quiz.timer_minutes || 17) * 60);
    })();
  }, []);

  //---------------- TIMER ----------------//
  useEffect(() => {
    if (!quiz) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();  // Auto submit
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quiz]);


  //---------------- SELECT ANSWERS ----------------//
  function onSelect(qid, opt) {
    setAnswers((prev) => ({
      ...prev,
      [qid]: opt
    }));
  }


  //---------------- SUBMIT ----------------//
  const handleSubmit = useCallback(async () => {
    clearInterval(timerRef.current);

    const s = JSON.parse(localStorage.getItem("student"));
    if (!s?.reg_no) return alert("Please login first.");

    const payload = {
      reg_no: s.reg_no,
      answers: questions.map((q) => ({
        question_id: q.question_id,
        selected_option: answers[q.question_id] || ""
      }))
    };

    const res = await submitQuiz(quiz.quiz_id, payload);

    if (res.error) return alert(res.error);

    localStorage.setItem("lastResult", JSON.stringify(res));

    alert(`Submitted. Score ${res.score}/${res.total}`);
    nav("/student");
  }, [quiz, questions, answers, nav]);


  //---------------- UI ----------------//
  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <div className="card">
        <div>
          <strong>{quiz.title}</strong> — {quiz.topic}
        </div>
        <div className="timer">
          Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
        <div style={{ marginTop: 8 }}>
          <button className="button btn-primary" onClick={handleSubmit}>
            Submit Now
          </button>
        </div>
      </div>

      {questions.map((q, i) => (
        <QuestionCard
          key={q.question_id}
          q={q}
          index={i}
          selected={answers[q.question_id]}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
