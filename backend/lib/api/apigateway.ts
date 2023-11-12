import { Cors, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

type createCRUDLAPIGatewayProps = {
  apiName: string;
  baseReasourceName: string;
  leafReasourceName: string;
  getAllBaseFunc: IFunction;
  putItemBaseFunc: IFunction;
  deleteItemBaseFunc: IFunction;
  getItemLeafFunc: IFunction;
};

export const createCRUDLAPIGateway = (
  scope: Construct,
  props: createCRUDLAPIGatewayProps
) => {
  const api = new RestApi(scope, props.apiName, {
    restApiName: props.apiName,
  });

  //Api gatway -- /books
  const baseReasource = api.root.addResource(props.baseReasourceName);
  //  /books/{id}
  const leafReasource = baseReasource.addResource(
    `{${props.leafReasourceName}}`
  );

  // Allow CORS for all api methods
  baseReasource.addCorsPreflight({
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
  });
  leafReasource.addCorsPreflight({
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
  });

  // Tie in Lambda function to a Get route
  const getAllBaseIntegration = new LambdaIntegration(props.getAllBaseFunc);
  const putItemBaseIntegration = new LambdaIntegration(props.putItemBaseFunc);
  const deleteItemBaseIntegration = new LambdaIntegration(
    props.deleteItemBaseFunc
  );
  const getItemLeafIntegration = new LambdaIntegration(props.getItemLeafFunc);

  baseReasource.addMethod("GET", getAllBaseIntegration);
  leafReasource.addMethod("GET", getItemLeafIntegration);
  baseReasource.addMethod("POST", putItemBaseIntegration);
  baseReasource.addMethod("PUT", putItemBaseIntegration);
  baseReasource.addMethod("DELETE", deleteItemBaseIntegration);

  return api;
};
