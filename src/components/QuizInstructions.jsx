import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizInstructions = ({ quiz, onClose }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    onClose();
    navigate(`/quiz/${quiz._id}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-green-700 mb-4 text-center">
          Quiz Instructions
        </h2>

        <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2">
          <li>You have {quiz.questions?.length *2} minutes to solve  .</li>
          <li>This quiz has {quiz.questions?.length || 0} questions.</li>
          <li>Each question carries 1 mark.</li>
          <li>You must select one answer for each question.</li>
          <li>Click "Start Quiz" to begin.</li>
        </ul>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleStart}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;
