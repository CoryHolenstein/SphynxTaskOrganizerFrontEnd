import { post } from 'aws-amplify/api';

export const updateTask = async (userId, taskId, taskData) => {
  try {
    const response = await post({
      apiName: 'taskapi',
      path: `/tasks/${taskId}`,
      options: {
        body: {
          userId,
          ...taskData
        }
      }
    }).response;

    return response.body;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};
