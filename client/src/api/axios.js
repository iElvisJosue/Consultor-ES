import axios from "axios";

const instance = axios.create({
  baseURL: "https://consultor-es.vercel.app/api",
  // baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default instance;
