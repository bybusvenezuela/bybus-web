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
          status
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
        percentage
        transport
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listOrderDetails = /* GraphQL */ `
  query ListOrderDetails(
    $filter: ModelOrderDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        amount
        paymentMethod
        documentType
        customerDocument
        customerName
        customerEmail
        total
        isGuest
        status
        paymentID
        payment {
          id
          reference
          amount
          metadata
          userID
          createdAt
          updatedAt
        }
        bookingID
        userID
        createdAt
        updatedAt
        userOrdersId
      }
      nextToken
    }
  }
`;
export const getOffice = /* GraphQL */ `
  query GetOffice($id: ID!) {
    getOffice(id: $id) {
      id
      agencyID
      name
      state
      city
      address
      email
      phone
      employees {
        items {
          id
          name
          email
          phone
          pin
          type
          agencyID
          agency {
            id
            cognitoID
            pin
            name
            rif
            email
            phone
            createdAt
            updatedAt
          }
          officeID
          office {
            id
            agencyID
            name
            state
            city
            address
            email
            phone
            createdAt
            updatedAt
          }
          status
          lastConnection
          createdAt
          updatedAt
        }
        nextToken
      }
      transports {
        items {
          id
          model
          serial
          type
          officeID
          createdBy
          createdAt
          updatedAt
        }
        nextToken
      }
      bookings {
        items {
          id
          status
          code
          agencyID
          percentage
          agency {
            id
            cognitoID
            pin
            name
            rif
            email
            phone
            createdAt
            updatedAt
          }
          officeID
          office {
            id
            agencyID
            name
            state
            city
            address
            email
            phone
            createdAt
            updatedAt
          }
          customers {
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
              createdAt
              updatedAt
              stopBookingTicketsId
            }
            nextToken
          }
          stops {
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
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
