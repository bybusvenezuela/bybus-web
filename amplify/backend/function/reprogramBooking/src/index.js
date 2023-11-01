/* Amplify Params - DO NOT EDIT
	API_BYBUSGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
	API_BYBUSGRAPHQL_GRAPHQLAPIIDOUTPUT
	AUTH_BYBUS_USERPOOLID
	ENV
	FUNCTION_REPROGRAMBOOKINGTICKET_NAME
	REGION
Amplify Params - DO NOT EDIT */
import moment from "moment-timezone";
import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

// Configura el cliente de AWS Lambda

const GRAPHQL_ENDPOINT = process.env.API_BYBUSGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;
moment.tz.setDefault("America/Caracas");

const lambda = new LambdaClient({
  region: AWS_REGION, // Reemplaza 'tu-region' con la región adecuada
});

const getBookingbyCode = /* GraphQL */ `
  query GetBookingbyCode(
    $code: String!
    $sortDirection: ModelSortDirection
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getBookingbyCode(
      code: $code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        code
      }
      nextToken
      __typename
    }
  }
`;

const listScheduleBookings = /* GraphQL */ `
  query LIST_SCHUEDULEBOOKINGS(
    $filter: ModelScheduleBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScheduleBookings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bookingID
        booking {
          id
          status
          code
          agencyID
          agency {
            id
            rif
            __typename
          }
          officeID
          office {
            id
            name
            state
            city
            __typename
          }
          tickets {
            items {
              id
            }
          }
          departureCity
          arrivalCity
          departure {
            time
            date
            city
            state
            address
          }
          arrival {
            time
            date
            city
            state
            address
          }
          stock
          price
          createdBy
          driver
          transport
          owner
          createdAt
          updatedAt
          __typename
        }
        freq
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;

const createBooking = /* GraphQL */ `
  mutation CreateBooking(
    $input: CreateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    createBooking(input: $input, condition: $condition) {
      id
      code
      stock
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;

const createTicket = /* GraphQL */ `
  mutation CreateTicket(
    $input: CreateTicketInput!
    $condition: ModelTicketConditionInput
  ) {
    createTicket(input: $input, condition: $condition) {
      id
      code
      bookingID
      __typename
    }
  }
`;
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const weekDays = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  /*
  Descripcion: Funcion que sirve para revisar a las 3 am hora venezuela la tabla de viajes programados
  con el fin de ver que viajes hay disponibles para crear el dia a dia
  1.Revisar que viajes disponibles hay programados para el dia que nos encontramos
  *Tentativo*: revisar si ese viaje ya esta programado puede ser 
  2.Crear el viaje en la tabla de reservas con la fecha modificada.
   */

  try {
    // obtengamos el dia de hoy
    const now = moment();
    const dayOfWeek = weekDays[new Date(now).getDay()];
    console.log("DIA DE LA SEMANA: ", dayOfWeek);
    // 1
    const scheduleResponse = await CUSTOM_API_GRAPHQL(listScheduleBookings, {
      filter: { freq: { contains: dayOfWeek } },
    });
    console.log(
      "SCHEDULE RESPONSE: ",
      scheduleResponse?.data?.listScheduleBookings?.items
    );

    // crear viajes
    for (const item of scheduleResponse?.data?.listScheduleBookings?.items) {
      const booking = item?.booking;
      const departureDate = moment(booking?.departure?.date);
      const arrivalDate = moment(booking?.arrival?.date);
      // generamos el codigo para el viaje determinado
      console.log("FECHA: ***  ", now.format("YYYY-MM-DD"));
      // Calcular la diferencia en días
      const daysDifference = arrivalDate.diff(departureDate, "days");
      const newArrivalDate = now
        .add(daysDifference, "days")
        .format("YYYY-MM-DD");
      console.log("DIFERENCIA DE DIAS: ", daysDifference);
      console.log("FECHA DE LLEGADA: ", newArrivalDate);
      console.log("EL BOOKING ES: ", booking);

      const code = await generateCode({
        rif: item?.booking?.agency?.rif,
        state: item?.booking?.office?.state,
        city: item?.booking?.office?.city,
        dateDeparture: now.format("YYYY-MM-DD"),
      });

      const inputParams = {
        agencyID: booking?.agencyID,
        officeID: booking?.officeID,
        transport: booking?.transport,
        driver: booking?.driver,
        code: code,
        departure: {
          ...booking?.departure,
          date: now.format("YYYY-MM-DD"),
        },
        arrival: {
          ...booking?.arrival,
          date: newArrivalDate,
        },
        departureCity: booking?.departureCity,
        arrivalCity: booking?.arrivalCity,
        stock: booking?.tickets?.items?.length,
        price: booking?.price,
        createdBy: booking?.createdBy,
        owner: booking?.owner,
      };
      console.log("PARAMS PARA CREAR VIAJE: ", inputParams);
      const result = await CUSTOM_API_GRAPHQL(createBooking, {
        input: inputParams,
      });
      console.log("RESULTADO DE CREACION DE VIAJE: ", result);
      console.log(result?.data?.createBooking?.stock);
      const tickets = [];
      for (
        let index = 1;
        index <= result?.data?.createBooking?.stock;
        index++
      ) {
        const ticketParam = {
          code: `${result?.data?.createBooking?.code}-${index
            .toString()
            .padStart(2, "0")}`,
          bookingID: result?.data?.createBooking?.id,
          status: "Active",
        };
        tickets.push(ticketParam);
        console.log("PARAMETROS DEL TICKET: ", ticketParam);
        // const ticket = await CUSTOM_API_GRAPHQL(createTicket, {
        //   input: ticketParams,
        // });
        // console.log("RESULTADO DE LOS TICKETS: ", ticket);
      }
      console.log("TICKETS: ", tickets);
      const lambdaResult = await CUSTOM_LAMBDA_CALL(tickets);
      console.log("RESULTADO DE LLAMAR AL LAMBDA: ", lambdaResult);
    }
    return {
      statusCode: 200,
      body: JSON.stringify("Lambda ejecutada"),
    };
  } catch (error) {
    throw new Error(error);
  }
};

const CUSTOM_API_GRAPHQL = async (query, variables = {}) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  let bodyContent = JSON.stringify({ query });
  if (variables) bodyContent = JSON.stringify({ query, variables });
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
    body: bodyContent,
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);

  const request = new Request(endpoint, signed);
  const response = await fetch(request);
  const result = await response.json();
  return result;
};

const generateCode = async (data) => {
  const { rif, state, city, dateDeparture } = data;
  console.log(data);
  let number = 1;
  let codeBooking = null;
  while (true) {
    codeBooking = `${rif.replace("-", "")}${state.slice(0, 3)}${city.slice(
      0,
      3
    )}${dateDeparture.replace(/-/g, "")}${number.toString().padStart(2, "0")}`;
    let isExistingCode = await CUSTOM_API_GRAPHQL(getBookingbyCode, {
      code: codeBooking.toUpperCase(),
    });
    if (isExistingCode.data.getBookingbyCode.items.length > 0) {
      number = number + 1;
    } else if (isExistingCode.data.getBookingbyCode.items.length === 0) {
      break;
    }
  }

  return codeBooking.toUpperCase();
};

const verifyCode = async (code) => {
  let resultCode = code;
  return resultCode;
};

const CUSTOM_LAMBDA_CALL = async (data) => {
  const input = {
    // InvocationRequest
    FunctionName: process.env.FUNCTION_REPROGRAMBOOKINGTICKET_NAME, // required
    InvocationType: "Event",
    Payload: JSON.stringify(data),
  };
  const command = new InvokeCommand(input);
  const response = await lambda.send(command);
  return response;
};
