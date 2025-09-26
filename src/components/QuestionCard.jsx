import React from "react";

const QuestionCard = ({ question, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-green-700 mb-2">{question.title}</h3>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Category:</strong> {question.category || "General"}
      </p>

      <div className="mb-2">
        <strong>Options:</strong>
        <ul className="list-disc list-inside mt-1">
          {question.options.map((opt) => (
            <li key={opt._id} className="text-gray-700">
              {opt.option}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-green-800 mb-2">
        <strong>Answer:</strong> {question.options.find(q=>q._id==question.answer).option}
      </p>  

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(question)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(question._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
