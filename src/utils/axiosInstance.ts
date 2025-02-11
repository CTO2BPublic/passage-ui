import axios from 'axios';
import { baseURL } from './endpoints';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
