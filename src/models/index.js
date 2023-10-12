// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SusbcriptionAgencyStatus = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "REJECTED": "REJECTED",
  "SCHEDULED": "SCHEDULED"
};

const PermissionsEmployees = {
  "QRSCAN": "QRSCAN",
  "BOOOKING_READ": "BOOOKING_READ",
  "BOOOKING_UPDATED": "BOOOKING_UPDATED",
  "BOOOKING_CREATED": "BOOOKING_CREATED",
  "BOOOKING_DELETED": "BOOOKING_DELETED",
  "BALANCE_OFFICE_READ": "BALANCE_OFFICE_READ"
};

const EmployeeType = {
  "OWNER": "OWNER",
  "OFFICE": "OFFICE",
  "COLLECTOR": "COLLECTOR"
};

const BookingStatus = {
  "AVAILABLE": "AVAILABLE",
  "BOARDING": "BOARDING",
  "DEPARTED": "DEPARTED",
  "ARRIVED": "ARRIVED"
};

const ServiceType = {
  "GROUD": "GROUD"
};

const DocumentType = {
  "V": "V",
  "E": "E",
  "P": "P"
};

const StatusUser = {
  "ALLOWED": "ALLOWED",
  "DENIED": "DENIED"
};

const { EmailSusbcription, AgencySubscription, Agency, Office, State, Employee, Transport, Booking, StopBooking, Customer, Ticket, OrderTicket, OrderDetail, Payment, orderDetailHistory, User, DepartureArrivalStopFields } = initSchema(schema);

export {
  EmailSusbcription,
  AgencySubscription,
  Agency,
  Office,
  State,
  Employee,
  Transport,
  Booking,
  StopBooking,
  Customer,
  Ticket,
  OrderTicket,
  OrderDetail,
  Payment,
  orderDetailHistory,
  User,
  SusbcriptionAgencyStatus,
  PermissionsEmployees,
  EmployeeType,
  BookingStatus,
  ServiceType,
  DocumentType,
  StatusUser,
  DepartureArrivalStopFields
};