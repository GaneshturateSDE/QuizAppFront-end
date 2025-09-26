import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizService from "../services/quiz.service";

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await QuizService.getById(id);
        setQuiz(data.quiz);
      } catch (err) {
        console.error(err);
      }
    };
    loadQuiz();
  }, [id]);

  const handleSelectAnswer = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
   
  };

  const handleSubmit = async () => {
    const payload = {
      answers: Object.keys(answers).map((key) => ({ qid:key ,aid: answers[key] })),
    };

   

    try {
      const res = await QuizService.submitQuiz(id, payload);
      
      alert(`Your score: ${res.score} ,Total: ${res.total}`);
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz");
    }
  };

  if (!quiz) return <p className="text-center mt-10">Loading quiz...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">{quiz.title}</h1>

      {quiz.questions.map((q, idx) => (
        <div key={q._id} className="bg-white shadow rounded p-4 mb-4">
          <p className="font-semibold mb-2">{idx + 1}. {q.title}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt) => (
              <label key={opt._id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={q._id}
                  value={opt._id}
                  checked={answers[q._id] === opt._id}
                  onChange={() => handleSelectAnswer(q._id, opt._id)}
                  className="form-radio h-5 w-5 text-green-600"
                />
                {opt.option}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default Quiz;
