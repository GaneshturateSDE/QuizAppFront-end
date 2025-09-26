import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import QuestionService from "../services/question.service";
import QuizService from "../services/quiz.service";
import QuizCard from "../components/QuizCard";
import { CATGEORY } from "../constants/constant";

const Quizzes = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: "" },
  });

  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Fetch questions from API
  const loadQuestions = useCallback(async (query = {}) => {
    try {
      const data = await QuestionService.getAll(query);
      setQuestions(data.questions || []);
    } catch (error) {
      setQuestions([]);
      
    }
  }, []);

  // Fetch quizzes from API
  const loadQuizzes = useCallback(async () => {
    try {
      const data = await QuizService.getAll();
      setQuizzes(data.quizzes || []);
    } catch (error) {
     
    }
  }, []);

  // Load quizzes on mount
  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);

  // Load questions whenever categoryFilter changes
  useEffect(() => {
    if (categoryFilter === "All") {
      loadQuestions();
    } else {
      loadQuestions({ category: categoryFilter });
    }
  }, [categoryFilter, loadQuestions]);

  // Select/deselect question
  const handleSelectQuestion = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  // Submit quiz (create/update)
  const onFormSubmit = async (data) => {
    if (!selectedQuestions.length) return alert("Select at least one question");
    const payload = { title: data.title, questions: selectedQuestions };

    try {
      if (editingQuiz) {
        await QuizService.update(editingQuiz._id, payload);
        setEditingQuiz(null);
      } else {
        await QuizService.create(payload);
      }
      reset();
      setSelectedQuestions([]);
      setCategoryFilter("All");
      loadQuizzes();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit quiz
  const handleEdit = (quiz) => {
    reset({ title: quiz.title });
    setSelectedQuestions(quiz.questions.map((q) => q._id));
    setEditingQuiz(quiz);
  };

  // Delete quiz
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await QuizService.delete(id);
      setQuizzes((prev) => prev.filter((q) => q._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      {/* Quiz Form */}
      <div className="bg-white shadow-md rounded p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
          {editingQuiz ? "Update Quiz" : "Create Quiz"}
        </h2>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Quiz Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
            {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Filter by Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            >
              <option value="All">All</option>
              {CATGEORY.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Questions */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Select Questions</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto border p-2 rounded">
              {questions.map((q) => (
                <label key={q._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q._id)}
                    onChange={() => handleSelectQuestion(q._id)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  {q.title}
                </label>
              ))}
              {questions.length === 0 && <h1>No Questions Available</h1>}
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            {editingQuiz ? "Update Quiz" : "Create Quiz"}
          </button>
        </form>
      </div>

      {/* Quiz List */}
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No quizzes found.</p>
        )}
        {quizzes.map((quiz) => (
          <QuizCard key={quiz._id} quiz={quiz} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
