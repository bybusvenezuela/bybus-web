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
          name
          state
          city
          address
          email
          phone
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
