import axios from "axios";

// Base URL for your backend API
const API_URL = import.meta.env.VITE_API_URL || "";

const create = async (quizData) => {
  try {
    const response = await axios.post(`${API_URL}/api/quizs`, quizData);
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error.response?.data || error;
  }
};

const getAll = async (query = {}) => {
  try {
    const response = await axios.get(`${API_URL}/api/quizs`, {
      params: query,  // <-- use params instead of query
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error.response?.data || error;
  }
};

const getById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/quizs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz ${id}:`, error);
    throw error.response?.data || error;
  }
};

const update = async (id, quizData) => {
  try {
    const response = await axios.put(`${API_URL}/api/quizs/${id}`, quizData);
    return response.data;
  } catch (error) {
    console.error(`Error updating quiz ${id}:`, error);
    throw error.response?.data || error;
  }
};

const remove = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/quizs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting quiz ${id}:`, error);
    throw error.response?.data || error;
  }
};

const submitQuiz = async (id, payload) => {
  try {
    const response = await axios.post(`${API_URL}/api/quizs/submit/${id}`,payload );
    return response.data;
  } catch (error) {
    console.error(`Error submitting quiz ${id}:`, error);
    throw error.response?.data || error;
  }
};

export default {
  create,
  getAll,
  getById,
  update,
  delete: remove,
  submitQuiz,
};
