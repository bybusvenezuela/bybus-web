export const getAgencySubscription = /* GraphQL */ `
  query GetAgencySubscription($id: ID!) {
    getAgencySubscription(id: $id) {
      id
      name
      rif
      email
      phone
      subscriptionDate
      status
      scheduledDate
      createdAt
      updatedAt
    }
  }
`;

export const listAgencies = /* GraphQL */ `
  query ListAgencies(
    $filter: ModelAgencyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgencies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cognitoID
        pin
        name
        rif
        email
        phone
        percentage
        status
        history {
          items {
            id
            agencyID
            reason
            description
            createdAt
            updatedAt
          }
          nextToken
        }
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
          }
          nextToken
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
            status
            lastConnection
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
            agency {
              id
              cognitoID
              pin
              name
              rif
              email
              phone
              percentage
              status
              history {
                items {
                  id
                  agencyID
                  reason
                  description
                  createdAt
                  updatedAt
                }
                nextToken
              }
              officies {
                nextToken
              }
              employees {
                nextToken
              }
              bookings {
                nextToken
              }
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
              status
              employees {
                nextToken
              }
              transports {
                nextToken
              }
              bookings {
                nextToken
              }
              createdAt
              updatedAt
            }
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
                orderDetailID
                stop
                customerID
                seating
                status
                description
                url
                createdAt
                updatedAt
                stopBookingTicketsId
                orderDetailTicketsId
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
            percentage
            createdBy
            driver
            transport
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

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
      status
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
        }
        nextToken
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
          status
          lastConnection
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
          officeID
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
          tickets {
            items {
              id
            }
          }
          createdBy
          driver
          transport
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        booking {
          id
          status
          code
          agencyID
          officeID
          departureCity
          arrivalCity
          stock
          price
          createdBy
          driver
          transport
          createdAt
          updatedAt
        }
        tickets {
          items {
            id
          }
          nextToken
        }
        userID
        createdAt
        updatedAt
        userOrdersId
      }
      nextToken
    }
  }
`;

export const getOrderDetail = /* GraphQL */ `
  query GetOrderDetail($id: ID!) {
    getOrderDetail(id: $id) {
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
      booking {
        id
        status
        code
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
          status
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        tickets {
          items {
            id
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
      tickets {
        items {
          id
          code
          bookingID
          orderDetailID
          stop
          customerID
          seating
          status
          description
          url
          createdAt
          updatedAt
          stopBookingTicketsId
          orderDetailTicketsId
        }
        nextToken
      }
      userID
      createdAt
      updatedAt
      userOrdersId
    }
  }
`;

export const listAgencyHistories = /* GraphQL */ `
  query ListAgencyHistories(
    $filter: ModelAgencyHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgencyHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        agencyID
        reason
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listAgenciesCSV = /* GraphQL */ `
  query ListAgencies(
    $filter: ModelAgencyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgencies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cognitoID
        pin
        name
        rif
        email
        phone
        percentage
        status
        history {
          items {
            id
            agencyID
            reason
            description
            createdAt
            updatedAt
          }
          nextToken
        }
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
          }
          nextToken
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
            status
            lastConnection
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
            agency {
              id
              cognitoID
              pin
              name
              rif
              email
              phone
              percentage
              status
            }
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
                orderDetailID
                stop
                customerID
                seating
                status
                description
                url
                createdAt
                updatedAt
                stopBookingTicketsId
                orderDetailTicketsId
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
            percentage
            createdBy
            driver
            transport
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listOrdersCSV = /* GraphQL */ `
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
        agency {
          id
          name
          rif
          email
          phone
        }
        departureCity
        arrivalCity
        departure {
          date
          city
          state
        }
        arrival {
          date
          city
          state
        }
        tickets {
          items {
            id
            bookingID
            orderDetailID
            customerID
            status
            code
            booking {
              id
              agencyID
              officeID
              createdBy
              percentage
              code
              driver
              transport
              stock
              status
              departure {
                city
                date
                time
                state
              }
              arrival {
                city
                date
                time
                state
              }
              price
            }
          }
        }
        stock
        price
        percentage
        transport
        __typename
      }
      nextToken
      __typename
    }
  }
`;
