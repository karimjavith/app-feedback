import Axios from 'axios';
export const FeedbackAPI = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

FeedbackAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

FeedbackAPI.interceptors.request.use((config) => {
  return config;
});

export default Axios;
