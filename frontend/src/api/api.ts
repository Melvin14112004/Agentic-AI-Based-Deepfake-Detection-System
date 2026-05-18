import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const uploadVideo = (file: File) => {
  const formData = new FormData();
  formData.append("video", file);
  return API.post("/analyze", formData);
};

export const analyzeUrl = (url: string) => {
  return API.post("/analyze-url", { url });
};
