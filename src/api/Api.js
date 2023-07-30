import axios from "axios";
const API_ENDPOINT_MOVIES = "http://localhost:3010/api/movies";

export const handleSubmit = async (formData) => {
  try {
    const response = await axios.post(API_ENDPOINT_MOVIES, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await response.json();
    console.log("Data sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};
