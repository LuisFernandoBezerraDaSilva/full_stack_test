import axios from 'axios';

const API_URL = 'http://localhost:3003';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error while uploading file: ${error}`);
    throw error;
  }
};

export default {
  uploadFile,
};