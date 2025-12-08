import axios from "axios";

const DELETE_URL = "https://r283rocx67.execute-api.us-east-1.amazonaws.com/dev/tasks/delete-task";

export async function deleteTask(userId, taskId) {
  try {
    console.log('[API] Deleting task:', { userId, taskId });
    const response = await axios.post(DELETE_URL, { userId, taskId });
    console.log('[API] Task deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API] Error deleting task:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      userId,
      taskId
    });
    throw error;
  }
}
