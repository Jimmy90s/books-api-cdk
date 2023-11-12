import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();

async function deleteItem(id: string) {
  const params = {
    TableName: process.env.BOOKS_TABLE_NAME,
    Key: {
      id: { S: id }, // Assuming ID is the primary key and is of type string
    },
  };

  try {
    const results = await client.send(new DeleteItemCommand(params));
    console.log(`Deleted item with ID: ${id}`);
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.handler = async (event: any) => {
  // Assuming the ID is sent in the body as: {"id": "somevalue"}
  console.log("Recived event:", JSON.parse(event.body));
  const { id } = JSON.parse(event.body);

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "id is missing in the request body",
      }),
    };
  }
  await deleteItem(id);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      message: `Successfully deleted item with id: ${id}`,
    }),
  };
};
