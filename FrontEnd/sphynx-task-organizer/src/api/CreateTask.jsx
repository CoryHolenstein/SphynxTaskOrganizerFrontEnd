import axios from 'axios';

const API_URL = "";

export async function createTask(payload) {
  try {
    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}