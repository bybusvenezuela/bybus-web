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
          transports {
            items {
              id
              model
              serial
              type
              officeID
            }
          }
        }
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
          permissions
          owner
          lastConnection
          createdAt
          updatedAt
          __typename
        }
      }
      __typename
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
      permissions
      __typename
    }
  }
`;
