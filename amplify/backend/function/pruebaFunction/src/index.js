/* Amplify Params - DO NOT EDIT
	API_BYBUSGRAPHQL_AGENCYSUBSCRIPTIONTABLE_ARN
	API_BYBUSGRAPHQL_AGENCYSUBSCRIPTIONTABLE_NAME
	API_BYBUSGRAPHQL_AGENCYTABLE_ARN
	API_BYBUSGRAPHQL_AGENCYTABLE_NAME
	API_BYBUSGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
	API_BYBUSGRAPHQL_GRAPHQLAPIIDOUTPUT
  API_BYBUSGRAPHQLF_GRAPHQLAPIKEYOUTPUT
	AUTH_BYBUSAUTH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";

const GRAPHQL_ENDPOINT = process.env.API_BYBUSGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_BYBUSGRAPHQL_GRAPHQLAPIKEYOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;

const query = /* GraphQL */ `
  query LIST_TODOS {
    listAgencySubscriptions {
      items {
        id
        name
        email
      }
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);

  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  return JSON.stringify({
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // },
    body: body,
  });
};
