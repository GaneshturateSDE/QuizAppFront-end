import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizService from "../services/quiz.service";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await QuizService.getAll();
        setQuizzes(data.quizzes || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadQuizzes();
  }, []);

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Available Quizzes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.length === 0 && <p className="text-gray-500 col-span-full text-center">No quizzes found.</p>}
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="bg-white shadow rounded p-4 flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-gray-800">{quiz.title}</h2>
            <p className="text-gray-600 mt-2">Questions: {quiz.questions.length}</p>
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleStartQuiz(quiz._id)}
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
