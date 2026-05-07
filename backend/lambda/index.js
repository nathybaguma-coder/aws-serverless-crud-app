import { SFNClient, StartExecutionCommand } from "@aws-sdk/client-sfn";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

const sfnClient = new SFNClient({});
const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

const STATE_MACHINE_ARN = "arn:aws:states:us-east-1:415333976535:stateMachine:appointment-workflow";

export const handler = async (event) => {
  const path = event.rawPath;

  try {
    if (path === "/hello") {
      const name = event.queryStringParameters?.name || "Guest";

      await sfnClient.send(
        new StartExecutionCommand({
          stateMachineArn: STATE_MACHINE_ARN,
          input: JSON.stringify({ name })
        })
      );

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/plain"
        },
        body: `Workflow started for ${name}`
      };
    }

    if (path === "/names") {
      const result = await docClient.send(
        new ScanCommand({
          TableName: "appointments-v2"
        })
      );

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(result.Items || [])
      };
    }

    if (path === "/delete") {
      const id = event.queryStringParameters?.id;

      if (!id) {
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "text/plain"
          },
          body: "ID is required"
        };
      }

      await docClient.send(
        new DeleteCommand({
          TableName: "appointments-v2",
          Key: {
            id: id
          }
        })
      );

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/plain"
        },
        body: `Deleted item ${id}`
      };
    }

    if (path === "/update") {
      const id = event.queryStringParameters?.id;
      const newName = event.queryStringParameters?.name;

      if (!id || !newName) {
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "text/plain"
          },
          body: "ID and new name are required"
        };
      }

      await docClient.send(
        new UpdateCommand({
          TableName: "appointments-v2",
          Key: {
            id: id
          },
          UpdateExpression: "SET #name = :newName",
          ExpressionAttributeNames: {
            "#name": "name"
          },
          ExpressionAttributeValues: {
            ":newName": newName
          }
        })
      );

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/plain"
        },
        body: `Updated item ${id} to ${newName}`
      };
    }

    return {
      statusCode: 404,
      headers: {
        "Content-Type": "text/plain"
      },
      body: "Route not found"
    };

  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/plain"
      },
      body: "Server error"
    };
  }
};