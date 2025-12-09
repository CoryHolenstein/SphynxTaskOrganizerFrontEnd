import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const TABLE_NAME = "tasks";

const CORS = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Headers": "content-type,authorization,x-requested-with,accept,origin",
  "Access-Control-Allow-Methods": "OPTIONS,POST"
};

async function createTask(data) {
  const item = {
    userId: data.userId,
    taskId: data.taskId ?? `${Date.now()}`,
    name: data.name,
    description: data.description,
    dueDate: data.dueDate,
    repeat: data.repeat
  };

  await client.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: item
  }));

  return { message: "Task created", item };
}

async function getAllTasks(data) {
  const result = await client.send(new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: "userId = :u",
    ExpressionAttributeValues: { ":u": data.userId }
  }));

  return { tasks: result.Items || [] };
}

async function deleteTask(data) {
  await client.send(new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { userId: data.userId, taskId: data.taskId }
  }));

  return { message: "Task deleted" };
}

export const handler = async (event) => {
  console.log("EVENT:", event);

  const route = event.routeKey; 
  const body = JSON.parse(event.body || "{}");

  try {
    let result;
    const path = event.rawPath;

    if (path.endsWith("/tasks/create-task")) {
      result = await createTask(body);
    } else if (path.endsWith("/tasks/get-all-tasks")) {
      result = await getAllTasks(body);
    } else if (path.endsWith("/tasks/delete-task")) {
      result = await deleteTask(body);
    } else {
      return { statusCode: 400, headers: CORS, body: "Unknown route" };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
