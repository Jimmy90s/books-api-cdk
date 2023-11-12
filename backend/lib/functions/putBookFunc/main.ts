import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient();

async function lambdaHandler(event: any): Promise<any> {
  // Parse the body to get the item
  const itemData = JSON.parse(event.body);
  itemData.id = itemData.id ?? uuidv4();

  // Marshall the item data to match DynamoDB's format with unique id
  const marshallItem = marshall(itemData);

  const params = {
    TableName: process.env.BOOKS_TABLE_NAME,
    Item: marshallItem,
  };

  try {
    await client.send(new PutItemCommand(params));
    return {
      statusCode: "200",
      header: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Item put successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: "500",
      body: "Internal Server Error",
    };
  }
}
exports.handler = lambdaHandler;
