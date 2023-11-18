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

  //Api gatway takes the root path "/" and turns into "/baseReasourceName" coming from props
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

  // Tie in Lambda functions
  const getItemLeafIntegration = new LambdaIntegration(props.getItemLeafFunc);
  const getAllBaseIntegration = new LambdaIntegration(props.getAllBaseFunc);
  const putItemBaseIntegration = new LambdaIntegration(props.putItemBaseFunc);
  const deleteItemBaseIntegration = new LambdaIntegration(
    props.deleteItemBaseFunc
  );

  baseReasource.addMethod("GET", getAllBaseIntegration);
  baseReasource.addMethod("POST", putItemBaseIntegration);
  baseReasource.addMethod("PUT", putItemBaseIntegration);
  baseReasource.addMethod("DELETE", deleteItemBaseIntegration);
  leafReasource.addMethod("GET", getItemLeafIntegration);

  return api;
};
