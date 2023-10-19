export const getAgency = /* GraphQL */ `
  query GetAgency($id: ID!) {
    getAgency(id: $id) {
      id
      cognitoID
      pin
      name
      rif
      email
      phone
      owner
      createdAt
      updatedAt
      __typename
      officies {
        items {
          id
          agencyID
          name
          state
          city
          address
          email
          phone
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      employees {
        items {
          id
          name
          email
          phone
          pin
          type
          agencyID
          officeID
          office {
            id
            name
            state
            city
          }
          owner
          lastConnection
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
    }
  }
`;

export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      name
      email
      phone
      pin
      type
      agencyID
      officeID
      office {
        id
        agencyID
        name
        state
        city
        address
        transports {
          items {
            id
            model
            serial
            type
          }
        }
      }
      __typename
    }
  }
`;

export const listBookings = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        code
        agencyID
        officeID
        customers {
          items {
            id
            fullName
            ci
            email
            bookingID
            ticketID
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
        tickets {
          items {
            id
            code
            bookingID
            stop
            customerID
            seating
            status
            description
            url
            owner
            createdAt
            updatedAt
            stopBookingTicketsId
          }
          nextToken
        }
        stops {
          items {
            id
            bookingID
            price
            owner
            createdAt
            updatedAt
          }
          nextToken
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
      }
      nextToken
    }
  }
`;