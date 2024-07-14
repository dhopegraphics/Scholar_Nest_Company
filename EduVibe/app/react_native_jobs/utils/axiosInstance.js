// utils/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const { config, response: { status } } = error;
    const maxRetries = 5;

    if (status === 429) {
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount < maxRetries) {
        config.__retryCount += 1;
        const delay = Math.pow(2, config.__retryCount) * 1000; // Exponential backoff

        await new Promise(resolve => setTimeout(resolve, delay));

        return axiosInstance(config);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
