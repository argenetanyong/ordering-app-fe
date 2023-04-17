import axios from "axios";

/* const mainAxios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
}); */

const mainAxios = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { mainAxios };
