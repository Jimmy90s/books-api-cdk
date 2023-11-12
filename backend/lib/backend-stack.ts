import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { createCRUDLAPIGateway } from "./api/apigateway";
import { createBooksTable } from "./database/booksTable";
import { createGetBooksFunc } from "./functions/getBooksFunc/constructs";
import { createPutBookFunc } from "./functions/putBookFunc/constructs";
import { createDeleteBookFunc } from "./functions/deleteBookFunc/constructs";
import { createGetItemBookFunc } from "./functions/getItemBookFunc/constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const booksTable = createBooksTable(this, {
      tableName: "booksTable",
    });

    const getBooksFunc = createGetBooksFunc(this, {
      functionName: "getBooksFunc",
      booksTableArn: booksTable.tableArn,
      enviornmentVars: { booksTableName: booksTable.tableName },
    });

    const putBookFunc = createPutBookFunc(this, {
      functionName: "putBookFunc",
      booksTableArn: booksTable.tableArn,
      enviornmentVars: { booksTableName: booksTable.tableName },
    });

    const deleteBookFunc = createDeleteBookFunc(this, {
      functionName: "deleteBookFunc",
      booksTableArn: booksTable.tableArn,
      enviornmentVars: { booksTableName: booksTable.tableName },
    });

    const getItemBookFunc = createGetItemBookFunc(this, {
      functionName: "getItemBookFunc",
      booksTableArn: booksTable.tableArn,
      enviornmentVars: { booksTableName: booksTable.tableName },
    });

    const booksAPI = createCRUDLAPIGateway(this, {
      apiName: "Books",
      baseReasourceName: "books",
      getAllBaseFunc: getBooksFunc,
      putItemBaseFunc: putBookFunc,
      getItemLeafFunc: getItemBookFunc,
      deleteItemBaseFunc: deleteBookFunc,
      leafReasourceName: "bookId",
    });
  }
}
