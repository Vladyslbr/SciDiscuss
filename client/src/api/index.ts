import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_HOST || `http://localhost:3300`
});

export default instance;