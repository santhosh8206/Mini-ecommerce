import axios from 'axios';
import { getApiUrl } from './api';

const api = axios.create({
    baseURL: (process.env.REACT_APP_API_URL || '').replace(/\s/g, '').replace(/\/$/, '') || '/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Create a version without the base URL for when we already have the full URL from getApiUrl
export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
