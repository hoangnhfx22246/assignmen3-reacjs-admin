import axios from "axios";
export const productApi = async () => {
  const backendUrl = import.meta.env.VITE_URL_BACKEND;
  try {
    const response = await axios.get(`${backendUrl}/products/`);
    return response.data.result;
  } catch (error) {
    console.error("Error logging in:", error.response.data.message);
    throw error.response.data.message;
  }
};
