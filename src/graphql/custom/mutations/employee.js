export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
    }
  }
`;
export const updateBooking = /* GraphQL */ `
  mutation UpdateBooking(
    $input: UpdateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    updateBooking(input: $input, condition: $condition) {
      id
      code
    }
  }
`;
export const createScheduleBooking = /* GraphQL */ `
  mutation CreateScheduleBooking(
    $input: CreateScheduleBookingInput!
    $condition: ModelScheduleBookingConditionInput
  ) {
    createScheduleBooking(input: $input, condition: $condition) {
      id
      bookingID
    }
  }
`;
