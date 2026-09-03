import axios from "axios";

const API_BASE_URL = "http://192.168.1.151:3000/api";

export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};

export const getQuestionsByCategory = async (categorySlug) => {
  const response = await axios.get(`${API_BASE_URL}/questions/category/${categorySlug}`);
  return response.data;
};
