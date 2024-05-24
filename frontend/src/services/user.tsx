import axios from 'axios';

const API_URL = 'http://localhost:3003';

const getAllFiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error(`Error while uploading file: ${error}`);
    throw error;
  }
};

const getFilteredFiles = async (query: string) => {
  
    try {
      const response = await axios.get(`${API_URL}/users?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error(`Error while uploading file: ${error}`);
      throw error;
    }
};

export default {
    getAllFiles,
    getFilteredFiles
};