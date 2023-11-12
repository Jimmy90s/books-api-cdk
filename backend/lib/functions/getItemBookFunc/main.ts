import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient();

async function getItem(id: string) {
  const params = {
    TableName: process.env.BOOKS_TABLE_NAME,
    Key: {
      id: { S: id }, // Assuming ID is the primary key and is of type string
    },
  };

  try {
    const results = await client.send(new GetItemCommand(params));
    if (results.Item) {
      return unmarshall(results.Item);
    } else {
      return null; // or throw an error if the item dose not exist
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.handler = async (event: any) => {
  //   /books/{id}
  const id = event.pathParameters?.bookId;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "id is missing in the request body",
      }),
    };
  }
  const item = await getItem(id);

  if (!item) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `Item with id: ${id} not found`,
      }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(item),
  };
};
