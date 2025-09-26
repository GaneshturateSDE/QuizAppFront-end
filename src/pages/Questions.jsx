import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import QuestionCard from "../components/QuestionCard";
import QuestionService from "../services/question.service";

const Questions = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: "", category: "", answer: "" },
  });

  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Fetch all questions
  const loadQuestions = useCallback(async () => {
    try {
      const data = await QuestionService.getAll();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  // Add option to the list
  const handleAddOption = () => {
    if (!optionInput.trim()) return;
    setOptions([...options, optionInput.trim()]);
    setOptionInput("");
  };

  const handleRemoveOption = (idx) => {
    setOptions(options.filter((_, i) => i !== idx));
  };

  // Handle add/update question
  const onFormSubmit = async (data) => {
    if (!options.includes(data.answer)) {
      alert("Answer must be one of the options");
      return;
    }

    const payload = { ...data, options };

    try {
      if (editingQuestion) {
       const response= await QuestionService.update(editingQuestion._id, payload);
        alert(response.message);
      } else {
        await QuestionService.create(payload);
        alert("Question added successfully");
      }

      // Refresh questions
      await loadQuestions();

      // Reset form
      reset({ title: "", category: "", answer: "" });
      setOptions([]);
      setEditingQuestion(null);

    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Something went wrong");
    }
    reset();
  };

  // Populate form for editing
  const handleEdit = (question) => {
    reset({
      title: question.title,
      category: question.category,
      answer: question.options.find(op=>op._id===question.answer).option,
    });
    setOptions(question.options.map(op=>op.option) || []);
    setEditingQuestion(question);
  };

  // Delete question
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      await QuestionService.delete(id);
      alert("Question deleted successfully");
      await loadQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      {/* Form */}
      <div className="flex justify-center mt-10">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
        >
          <h3 className="text-xl font-bold mb-4 text-green-700 text-center">
            {editingQuestion ? "Update Question" : "Add Question"}
          </h3>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <input
              {...register("category")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Options */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Option</label>
            <div className="flex gap-2">
              <input
                value={optionInput}
                onChange={(e) => setOptionInput(e.target.value)}
                placeholder="Type option and click Add"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {options.map((opt, idx) => (
                <li key={idx} className="flex justify-between items-center bg-green-50 px-2 py-1 rounded mb-1">
                  <span>{opt}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(idx)}
                    className="text-red-500 font-bold hover:text-red-700"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Answer */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Answer</label>
            <input
              {...register("answer", { required: "Answer is required" })}
              placeholder="Correct answer"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
            {errors.answer && <p className="text-red-500 text-sm mt-1">{errors.answer.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            {editingQuestion ? "Update" : "Add"} Question
          </button>
        </form>
      </div>

      {/* Question Cards */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4 text-center">
          Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">No questions found.</p>
          )}
          {questions.map((q) => (
            <QuestionCard
              key={q._id}
              question={q}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Questions;
