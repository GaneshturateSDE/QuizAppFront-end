import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizService from "../services/quiz.service";

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); 
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await QuizService.getById(id);
        setQuiz(data.quiz);
        setTimeLeft((data.quiz.questions?.length || 0) * 2 * 60);
      } catch (err) {
        console.error("Error loading quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [id]);

   
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); 
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelectAnswer = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const navigate = useNavigate();
const handleSubmit = async () => {
  const payload = {
    answers: Object.keys(answers).map((qid) => ({
      qid,
      aid: answers[qid],
    })),
  };

  try {
    const result = await QuizService.submitQuiz(id, payload);
 
    navigate(`/quiz/${id}/result`, { state: { result } });
  } catch (err) {
    console.error("Error submitting quiz:", err);
  }
};

const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) return <p className="text-center mt-6">Loading quiz...</p>;
  if (!quiz) return <p className="text-center mt-6">Quiz not found</p>;

  const currentQuestion = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">

       {/* Header with timer */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">{quiz.title}</h1>
        <span className="text-lg font-semibold text-red-600">
          ⏳ {formatTime(timeLeft)}
        </span>
      </div>
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        {quiz.title}
      </h1>

      {currentQuestion && (
        <div
          key={currentQuestion._id}
          className="bg-white shadow rounded p-4 mb-4"
        >
          <p className="font-semibold mb-2">
            Q{currentIndex + 1}. {currentQuestion.title}
          </p>
          <div className="flex flex-col gap-2">
            {currentQuestion.options.map((opt) => (
              <label key={opt._id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={currentQuestion._id}
                  value={opt._id}
                  checked={answers[currentQuestion._id] === opt._id}
                  onChange={() =>
                    handleSelectAnswer(currentQuestion._id, opt._id)
                  }
                  className="form-radio h-5 w-5 text-green-600"
                />
                {opt.option}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          disabled={currentIndex === 0}
          onClick={handlePrev}
          className={`px-4 py-2 rounded font-bold ${
            currentIndex === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          Previous
        </button>

        {!isLastQuestion ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded font-bold bg-green-600 hover:bg-green-700 text-white"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded font-bold bg-green-600 hover:bg-green-700 text-white"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
