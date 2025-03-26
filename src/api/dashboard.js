import axios from "axios";

export const getStats = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_BACKEND}/dashboard/info`,
      { withCredentials: true }
    );

    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};
export const getOrdersHistory = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_BACKEND}/dashboard/orders-history`,
      { withCredentials: true }
    );

    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};
