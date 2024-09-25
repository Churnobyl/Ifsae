import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: import.meta.env.AXIOS_TIMEOUT * 1000,
});
