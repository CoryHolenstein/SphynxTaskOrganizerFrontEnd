import axios from "axios";

const CREATE_URL = "https://r283rocx67.execute-api.us-east-1.amazonaws.com/dev/tasks/create-task";

export async function createTask(task) {
  try {
    console.log('[API] Creating task with payload:', task);
    const response = await axios.post(CREATE_URL, task);
    console.log('[API] Task created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API] Error creating task:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      task
    });
    throw error;
  }
}
