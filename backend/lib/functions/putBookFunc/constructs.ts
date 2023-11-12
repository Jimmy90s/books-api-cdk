import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";

type putBookFuncProps = {
  functionName: string;
  booksTableArn: string;
  enviornmentVars: { booksTableName: string };
};

export const createPutBookFunc = (
  scope: Construct,
  props: putBookFuncProps
) => {
  const putBooksFunc = new NodejsFunction(scope, `${props.functionName}`, {
    functionName: `${props.functionName}`,
    runtime: Runtime.NODEJS_LATEST,
    handler: "handler",
    entry: path.join(__dirname, `./main.ts`),
    environment: {
      BOOKS_TABLE_NAME: props.enviornmentVars.booksTableName,
    },
  });

  // Iam policies that allow different actions
  putBooksFunc.addToRolePolicy(
    new PolicyStatement({
      actions: ["dynamodb:PutItem", "dynamodb:UpdateItem"],
      resources: [props.booksTableArn],
    })
  );
  return putBooksFunc;
};
