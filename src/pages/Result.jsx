import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.result) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 text-center">
        <p className="text-red-600">No result found. Please attempt the quiz first.</p>
        <button
          onClick={() => navigate("/quizzes")}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  const { score, total, details } = state.result;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Quiz Results
      </h1>

      <p className="text-xl text-center mb-6">
        Score: <span className="font-bold">{score}</span> / {total}
      </p>

      <div className="space-y-6">
        {details.map((item, idx) => (
          <div
            key={item.question._id}
            className="bg-white shadow rounded p-4 border-l-4"
          >
            <p className="font-semibold mb-2">
              Q{idx + 1}. {item.question.title} 
            </p>
            <ul className="space-y-2">
              {item.question.options.map((opt) => {
                const isCorrect = opt._id === item.correctAnswer;
                const isUserAnswer = opt._id === item.userAnswer;

                return (
                  <li
                    key={opt._id}
                    className={`p-2 rounded ${
                      isCorrect
                        ? "bg-green-100 border border-green-400"
                        : isUserAnswer
                        ? "bg-red-100 border border-red-400"
                        : "bg-gray-50"
                    }`}
                  >
                    {opt.option}
                    {isCorrect && (
                      <span className="ml-2 text-green-600 font-bold">(Correct )</span>
                    )}
                    {isUserAnswer && !isCorrect && (
                      <span className="ml-2 text-red-600 font-bold">(Your Answer)</span>
                    )}
                    {isUserAnswer && isCorrect && (
                      <span className="ml-2 text-green-600">✅</span>
                    )}
                    
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Quizzes
        </button>
      </div>
    </div>
  );
};

export default Result;
