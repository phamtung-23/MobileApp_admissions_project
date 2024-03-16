import axiosClient from "./axios.client";

export const chatCompletion = async ({ prompt }) => {
  try {
    const response = await axiosClient.post("gpt", { prompt });

    return { response };
  } catch (err) {
    return { err };
  }
};