/* Amplify Params - DO NOT EDIT
	API_BYBUSGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
	API_BYBUSGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_BYBUSGRAPHQL_TICKETTABLE_ARN
	API_BYBUSGRAPHQL_TICKETTABLE_NAME
	AUTH_BYBUS_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
// configutacion de cliente de dynamodb
const dynamodb = new DynamoDBClient({ region: "us-east-1" });
const TABLE_TICKET_NAME = process.env.API_BYBUSGRAPHQL_TICKETTABLE_NAME;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const item of event) {
    console.log("ITEM SEPARADO: ", item);
    const ticket = await CREATE_TICKET(item);
    console.log("RESULTADO DE LOS TICKETS: ", ticket);
  }
  return {
    statusCode: 200,
    body: JSON.stringify("TICKET LAMBDA EJECUTADO"),
  };
};

const CREATE_TICKET = async (data) => {
  const { code, bookingID, status } = data;
  const ID = uuidv4();
  console.log("ID: ", ID);
  // parametros de items table
  const info = {
    id: { S: ID },
    code: { S: code },
    bookingID: { S: bookingID },
    status: { S: status },
    __typename: { S: "Ticket" },
  };

  // formato de Put Item
  const params = {
    TableName: TABLE_TICKET_NAME,
    Item: info,
  };
  const result = await dynamodb.send(new PutItemCommand(params));
  return {
    id: ID,
    result: result,
  };
};
