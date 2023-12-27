export const onUpdateOrderDetail = /* GraphQL */ `
  subscription OnUpdateOrderDetail(
    $filter: ModelSubscriptionOrderDetailFilterInput
    $owner: String
  ) {
    onUpdateOrderDetail(filter: $filter, owner: $owner) {
      id
      status
    }
  }
`;