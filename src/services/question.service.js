import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const QuestionService = {
  // Get all questions
  getAll: async (query={}) => {
    try {
      const res = await axios.get(`${API_URL}/api/questions`,{
        params: query
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  },

  // Get question by ID
  getById: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/api/questions/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error fetching question ${id}:`, error);
      throw error;
    }
  },

  // Add new question
  create: async (question) => {
    try {
      const res = await axios.post(`${API_URL}/api/questions`, question);
      return res.data;
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  },

  // Update question by ID
  update: async (id, question) => {
    try {
      const res = await axios.put(`${API_URL}/api/questions/${id}`, question);
      return res.data;
    } catch (error) {
      console.error(`Error updating question ${id}:`, error);
      throw error;
    }
  },

  // Delete question by ID
  delete: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/api/questions/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error deleting question ${id}:`, error);
      throw error;
    }
  },
};

export default QuestionService;
