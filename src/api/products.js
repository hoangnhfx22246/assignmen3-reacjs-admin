import axios from "axios";
const backendUrl = import.meta.env.VITE_URL_BACKEND;

export const productApi = async () => {
  try {
    const response = await axios.get(`${backendUrl}/products/`);
    return response.data.result;
  } catch (error) {
    console.error("Error logging in:", error.response.data.message);
    throw error.response.data.message;
  }
};
export const createProduct = async (formDataForUpload) => {
  try {
    const response = await axios.post(
      `${backendUrl}/products/product`,
      formDataForUpload,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error:", error.response.data.message);
    throw error.response.data.message;
  }
};
export const updateProduct = async (id, formDataForUpload) => {
  try {
    const response = await axios.put(
      `${backendUrl}/products/product/${id}`,
      formDataForUpload,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error:", error.response.data.message);
    throw error.response.data.message;
  }
};
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${backendUrl}/products/${id}`, {
      withCredentials: true,
    });
    return response.data.message;
  } catch (error) {
    console.error("Error:", error.response.data.message);
    throw error.response.data.message;
  }
};
