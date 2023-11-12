import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
const client = new DynamoDBClient();

const params = {
  TableName: process.env.BOOKS_TABLE_NAME,
};

async function scanAndUnmarshall() {
  try {
    const results = await client.send(new ScanCommand(params));
    console.log(results);
    if (results.Items) {
      return results.Items.map((item) => unmarshall(item));
    }
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
exports.handler = async () => {
  const results = await scanAndUnmarshall();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(results),
  };
};
