export const listEmailSusbcriptions = /* GraphQL */ `
  query ListEmailSusbcriptions(
    $filter: ModelEmailSusbcriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailSusbcriptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        # createdAt
        # updatedAt
      }
      nextToken
    }
  }
`;

export const listAgencySubscriptions = /* GraphQL */ `
  query ListAgencySubscriptions(
    $filter: ModelAgencySubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgencySubscriptions(
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