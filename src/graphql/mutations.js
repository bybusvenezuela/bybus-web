/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const registerAgencyAdmin = /* GraphQL */ `
  mutation RegisterAgencyAdmin($input: RegisterUserInput!) {
    registerAgencyAdmin(input: $input)
  }
`;
export const deleteAgency = /* GraphQL */ `
  mutation DeleteAgency(
    $input: DeleteAgencyInput!
    $condition: ModelAgencyConditionInput
  ) {
    deleteAgency(input: $input, condition: $condition) {
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
export const createEmailSusbcription = /* GraphQL */ `
  mutation CreateEmailSusbcription(
    $input: CreateEmailSusbcriptionInput!
    $condition: ModelEmailSusbcriptionConditionInput
  ) {
    createEmailSusbcription(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmailSusbcription = /* GraphQL */ `
  mutation UpdateEmailSusbcription(
    $input: UpdateEmailSusbcriptionInput!
    $condition: ModelEmailSusbcriptionConditionInput
  ) {
    updateEmailSusbcription(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmailSusbcription = /* GraphQL */ `
  mutation DeleteEmailSusbcription(
    $input: DeleteEmailSusbcriptionInput!
    $condition: ModelEmailSusbcriptionConditionInput
  ) {
    deleteEmailSusbcription(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createAgencySubscription = /* GraphQL */ `
  mutation CreateAgencySubscription(
    $input: CreateAgencySubscriptionInput!
    $condition: ModelAgencySubscriptionConditionInput
  ) {
    createAgencySubscription(input: $input, condition: $condition) {
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
export const updateAgencySubscription = /* GraphQL */ `
  mutation UpdateAgencySubscription(
    $input: UpdateAgencySubscriptionInput!
    $condition: ModelAgencySubscriptionConditionInput
  ) {
    updateAgencySubscription(input: $input, condition: $condition) {
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
export const deleteAgencySubscription = /* GraphQL */ `
  mutation DeleteAgencySubscription(
    $input: DeleteAgencySubscriptionInput!
    $condition: ModelAgencySubscriptionConditionInput
  ) {
    deleteAgencySubscription(input: $input, condition: $condition) {
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
export const createAgency = /* GraphQL */ `
  mutation CreateAgency(
    $input: CreateAgencyInput!
    $condition: ModelAgencyConditionInput
  ) {
    createAgency(input: $input, condition: $condition) {
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
export const updateAgency = /* GraphQL */ `
  mutation UpdateAgency(
    $input: UpdateAgencyInput!
    $condition: ModelAgencyConditionInput
  ) {
    updateAgency(input: $input, condition: $condition) {
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
