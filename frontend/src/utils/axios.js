import axios from 'axios';
import { readToken } from "./localStorage";
import { notificationController } from './toast';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
    (config) => {
        const token = readToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers["Content-Type"] = `application/json`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            notificationController.error(error.response.data.message);
        } else if (error.request) {
            console.log('Request error:', error.request);
        } else {
            console.log('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;
