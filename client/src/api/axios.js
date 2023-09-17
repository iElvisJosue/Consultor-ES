import axios from "axios";

const instance = axios.create({
  baseURL: "https://consultor-es.onrender.com/api",
  withCredentials: true,
});

export default instance;
