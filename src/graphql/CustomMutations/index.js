export const createAgency = /* GraphQL */ `
  mutation CreateAgency(
    $input: CreateAgencyInput!
    $condition: ModelAgencyConditionInput
  ) {
    createAgency(input: $input, condition: $condition) {
      userID
      name
      rif
      email
      phone
      officies {
        items {
          id
          agencyID
          state
          city
          address
          email
          phone
          owner
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
          ping
          type
          agencyID
          officeID
          permissions
          owner
          lastConnection
          createdAt
          updatedAt
        }
        nextToken
      }
      bookings {
        items {
          id
          code
          agencyID
          officeID
          departureDate
          arrivalDate
          estimatedTime
          departureLoc
          destinationLoc
          stock
          service
          createdBy
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;