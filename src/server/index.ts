import axios from "axios";
import { toast } from "react-toastify";
import { ENDPOINT, TOKEN } from "../constants";

const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
  headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
});

request.interceptors.response.use(
  (response) => response,
  (err) => {
    console.log("Err: ", err);
    toast.error(err.response.data, { autoClose: 1000 });

    return Promise.reject(err);
  }
);

export default request;
