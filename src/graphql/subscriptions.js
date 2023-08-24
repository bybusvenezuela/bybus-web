/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEmailSusbcription = /* GraphQL */ `
  subscription OnCreateEmailSusbcription(
    $filter: ModelSubscriptionEmailSusbcriptionFilterInput
  ) {
    onCreateEmailSusbcription(filter: $filter) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateEmailSusbcription = /* GraphQL */ `
  subscription OnUpdateEmailSusbcription(
    $filter: ModelSubscriptionEmailSusbcriptionFilterInput
  ) {
    onUpdateEmailSusbcription(filter: $filter) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteEmailSusbcription = /* GraphQL */ `
  subscription OnDeleteEmailSusbcription(
    $filter: ModelSubscriptionEmailSusbcriptionFilterInput
  ) {
    onDeleteEmailSusbcription(filter: $filter) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAgencySubscription = /* GraphQL */ `
  subscription OnCreateAgencySubscription(
    $filter: ModelSubscriptionAgencySubscriptionFilterInput
  ) {
    onCreateAgencySubscription(filter: $filter) {
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
      __typename
    }
  }
`;
export const onUpdateAgencySubscription = /* GraphQL */ `
  subscription OnUpdateAgencySubscription(
    $filter: ModelSubscriptionAgencySubscriptionFilterInput
  ) {
    onUpdateAgencySubscription(filter: $filter) {
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
      __typename
    }
  }
`;
export const onDeleteAgencySubscription = /* GraphQL */ `
  subscription OnDeleteAgencySubscription(
    $filter: ModelSubscriptionAgencySubscriptionFilterInput
  ) {
    onDeleteAgencySubscription(filter: $filter) {
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
      __typename
    }
  }
`;
export const onCreateAgency = /* GraphQL */ `
  subscription OnCreateAgency(
    $filter: ModelSubscriptionAgencyFilterInput
    $owner: String
  ) {
    onCreateAgency(filter: $filter, owner: $owner) {
      id
      cognitoID
      name
      rif
      email
      phone
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAgency = /* GraphQL */ `
  subscription OnUpdateAgency(
    $filter: ModelSubscriptionAgencyFilterInput
    $owner: String
  ) {
    onUpdateAgency(filter: $filter, owner: $owner) {
      id
      cognitoID
      name
      rif
      email
      phone
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAgency = /* GraphQL */ `
  subscription OnDeleteAgency(
    $filter: ModelSubscriptionAgencyFilterInput
    $owner: String
  ) {
    onDeleteAgency(filter: $filter, owner: $owner) {
      id
      cognitoID
      name
      rif
      email
      phone
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
