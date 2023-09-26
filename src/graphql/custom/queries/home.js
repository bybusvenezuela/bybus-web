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
          permissions
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
      permissions
      __typename
    }
  }
`;
