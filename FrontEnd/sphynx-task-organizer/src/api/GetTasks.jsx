import axios from "axios";

const GET_URL = "https://r283rocx67.execute-api.us-east-1.amazonaws.com/dev/tasks/get-all-tasks";

export async function getAllTasks(userId) {
  try {
    console.log('[API] Fetching tasks for userId:', userId);
    const response = await axios.post(GET_URL, { userId });
    console.log('[API] Tasks fetched successfully:', response.data.tasks);
    return response.data.tasks;
  } catch (error) {
    console.error('[API] Error fetching tasks:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      userId
    });
    throw error;
  }
}
