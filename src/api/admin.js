import axios from "axios";
export const loginApi = async (email, password) => {
  const backendUrl = import.meta.env.VITE_URL_BACKEND;
  try {
    const response = await axios.post(
      `${backendUrl}/admin/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return {
      userData: response.data.result,
      expiresAt: response.data.expiresAt,
    };
  } catch (error) {
    console.error("Error logging in:", error.response.data.message);
    throw error.response.data.message;
  }
};

export const logoutApi = async () => {
  const backendUrl = import.meta.env.VITE_URL_BACKEND;
  try {
    await axios.post(
      `${backendUrl}/admin/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error logging in:", error.response.data.message);
    throw error.response.data.message;
  }
};
