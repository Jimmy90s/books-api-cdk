import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";

type getItemBookFuncProps = {
  functionName: string;
  booksTableArn: string;
  enviornmentVars: { booksTableName: string };
};

export const createGetItemBookFunc = (
  scope: Construct,
  props: getItemBookFuncProps
) => {
  const getItemBookFunc = new NodejsFunction(scope, `${props.functionName}`, {
    functionName: `${props.functionName}`,
    runtime: Runtime.NODEJS_LATEST,
    handler: "handler",
    entry: path.join(__dirname, `./main.ts`),
    environment: {
      BOOKS_TABLE_NAME: props.enviornmentVars.booksTableName,
    },
  });

  // Iam policies that allow different actions
  getItemBookFunc.addToRolePolicy(
    new PolicyStatement({
      actions: ["dynamodb:GetItem"],
      resources: [props.booksTableArn],
    })
  );
  return getItemBookFunc;
};
