import axios from "axios";

const instance = axios.create({
  baseURL: "https://consultor-es.onrender.com:10000/api",
  withCredentials: true,
});

export default instance;
