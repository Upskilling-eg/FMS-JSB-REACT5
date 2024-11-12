import axios from "axios";
import { baseURL } from "./apiURLs";
import { toast } from "react-toastify";
export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});
