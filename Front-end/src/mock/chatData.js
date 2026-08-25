import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

async function getResponse(chatHistory) {
  if (!chatHistory || typeof JSON.stringify(chatHistory) !== "string") {
    throw new Error("Please provide a valid prompt");
  }

  const response = await api.post("/api/v1/ai/chat", {
    prompt: JSON.stringify(chatHistory),
  });

  return response.data;
}

export default getResponse;