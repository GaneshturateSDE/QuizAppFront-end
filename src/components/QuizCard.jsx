import React from "react";

const QuizCard = ({ quiz, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 border border-green-100">
      <h3 className="text-lg font-bold text-green-700 mb-2">{quiz.title}</h3>
      
      {quiz.questions?.length > 0 && (
        <ul className="list-disc list-inside mb-2">
          {quiz.questions.map((q, idx) => (
            <li key={q._id || idx}>{q.title || "Question title"}</li>
          ))}
        </ul>
      )}

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(quiz)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(quiz._id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
