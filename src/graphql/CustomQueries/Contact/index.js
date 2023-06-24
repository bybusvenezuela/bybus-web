export const getAgencySubscriptionbyRif = /* GraphQL */ `
  query GetAgencySubscriptionbyRif(
    $rif: String!
    $sortDirection: ModelSortDirection
    $filter: ModelAgencySubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getAgencySubscriptionbyRif(
      rif: $rif
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getAgencySubscriptionbyEmail = /* GraphQL */ `
  query GetAgencySubscriptionbyEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelAgencySubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getAgencySubscriptionbyEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;

export const getEmailSubscriptionbyEmail = /* GraphQL */ `
  query GetEmailSubscriptionbyEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelEmailSusbcriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getEmailSubscriptionbyEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;