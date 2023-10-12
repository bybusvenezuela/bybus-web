import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum SusbcriptionAgencyStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  SCHEDULED = "SCHEDULED"
}

export enum PermissionsEmployees {
  QRSCAN = "QRSCAN",
  BOOOKING_READ = "BOOOKING_READ",
  BOOOKING_UPDATED = "BOOOKING_UPDATED",
  BOOOKING_CREATED = "BOOOKING_CREATED",
  BOOOKING_DELETED = "BOOOKING_DELETED",
  BALANCE_OFFICE_READ = "BALANCE_OFFICE_READ"
}

export enum EmployeeType {
  OWNER = "OWNER",
  OFFICE = "OFFICE",
  COLLECTOR = "COLLECTOR"
}

export enum BookingStatus {
  AVAILABLE = "AVAILABLE",
  BOARDING = "BOARDING",
  DEPARTED = "DEPARTED",
  ARRIVED = "ARRIVED"
}

export enum ServiceType {
  GROUD = "GROUD"
}

export enum DocumentType {
  V = "V",
  E = "E",
  P = "P"
}

export enum StatusUser {
  ALLOWED = "ALLOWED",
  DENIED = "DENIED"
}

type EagerDepartureArrivalStopFields = {
  readonly time?: string | null;
  readonly date?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly address?: string | null;
}

type LazyDepartureArrivalStopFields = {
  readonly time?: string | null;
  readonly date?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly address?: string | null;
}

export declare type DepartureArrivalStopFields = LazyLoading extends LazyLoadingDisabled ? EagerDepartureArrivalStopFields : LazyDepartureArrivalStopFields

export declare const DepartureArrivalStopFields: (new (init: ModelInit<DepartureArrivalStopFields>) => DepartureArrivalStopFields)

type EagerEmailSusbcription = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmailSusbcription, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmailSusbcription = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmailSusbcription, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmailSusbcription = LazyLoading extends LazyLoadingDisabled ? EagerEmailSusbcription : LazyEmailSusbcription

export declare const EmailSusbcription: (new (init: ModelInit<EmailSusbcription>) => EmailSusbcription) & {
  copyOf(source: EmailSusbcription, mutator: (draft: MutableModel<EmailSusbcription>) => MutableModel<EmailSusbcription> | void): EmailSusbcription;
}

type EagerAgencySubscription = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AgencySubscription, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly rif: string;
  readonly email: string;
  readonly phone: string;
  readonly subscriptionDate?: string | null;
  readonly status?: SusbcriptionAgencyStatus | keyof typeof SusbcriptionAgencyStatus | null;
  readonly scheduledDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAgencySubscription = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AgencySubscription, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly rif: string;
  readonly email: string;
  readonly phone: string;
  readonly subscriptionDate?: string | null;
  readonly status?: SusbcriptionAgencyStatus | keyof typeof SusbcriptionAgencyStatus | null;
  readonly scheduledDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AgencySubscription = LazyLoading extends LazyLoadingDisabled ? EagerAgencySubscription : LazyAgencySubscription

export declare const AgencySubscription: (new (init: ModelInit<AgencySubscription>) => AgencySubscription) & {
  copyOf(source: AgencySubscription, mutator: (draft: MutableModel<AgencySubscription>) => MutableModel<AgencySubscription> | void): AgencySubscription;
}

type EagerAgency = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Agency, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cognitoID?: string | null;
  readonly pin?: string | null;
  readonly name?: string | null;
  readonly rif?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly officies?: (Office | null)[] | null;
  readonly employees?: (Employee | null)[] | null;
  readonly bookings?: (Booking | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAgency = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Agency, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cognitoID?: string | null;
  readonly pin?: string | null;
  readonly name?: string | null;
  readonly rif?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly officies: AsyncCollection<Office>;
  readonly employees: AsyncCollection<Employee>;
  readonly bookings: AsyncCollection<Booking>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Agency = LazyLoading extends LazyLoadingDisabled ? EagerAgency : LazyAgency

export declare const Agency: (new (init: ModelInit<Agency>) => Agency) & {
  copyOf(source: Agency, mutator: (draft: MutableModel<Agency>) => MutableModel<Agency> | void): Agency;
}

type EagerOffice = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Office, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly agencyID?: string | null;
  readonly name?: string | null;
  readonly state?: string | null;
  readonly city?: string | null;
  readonly address?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly employees?: (Employee | null)[] | null;
  readonly transports?: (Transport | null)[] | null;
  readonly bookings?: (Booking | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOffice = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Office, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly agencyID?: string | null;
  readonly name?: string | null;
  readonly state?: string | null;
  readonly city?: string | null;
  readonly address?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly employees: AsyncCollection<Employee>;
  readonly transports: AsyncCollection<Transport>;
  readonly bookings: AsyncCollection<Booking>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Office = LazyLoading extends LazyLoadingDisabled ? EagerOffice : LazyOffice

export declare const Office: (new (init: ModelInit<Office>) => Office) & {
  copyOf(source: Office, mutator: (draft: MutableModel<Office>) => MutableModel<Office> | void): Office;
}

type EagerState = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<State, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly cities?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyState = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<State, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly cities?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type State = LazyLoading extends LazyLoadingDisabled ? EagerState : LazyState

export declare const State: (new (init: ModelInit<State>) => State) & {
  copyOf(source: State, mutator: (draft: MutableModel<State>) => MutableModel<State> | void): State;
}

type EagerEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Employee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly pin?: string | null;
  readonly type?: EmployeeType | keyof typeof EmployeeType | null;
  readonly agencyID?: string | null;
  readonly agency?: Agency | null;
  readonly officeID?: string | null;
  readonly office?: Office | null;
  readonly permissions?: (PermissionsEmployees | null)[] | keyof typeof PermissionsEmployees | null;
  readonly owner?: string | null;
  readonly lastConnection?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Employee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly pin?: string | null;
  readonly type?: EmployeeType | keyof typeof EmployeeType | null;
  readonly agencyID?: string | null;
  readonly agency: AsyncItem<Agency | undefined>;
  readonly officeID?: string | null;
  readonly office: AsyncItem<Office | undefined>;
  readonly permissions?: (PermissionsEmployees | null)[] | keyof typeof PermissionsEmployees | null;
  readonly owner?: string | null;
  readonly lastConnection?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Employee = LazyLoading extends LazyLoadingDisabled ? EagerEmployee : LazyEmployee

export declare const Employee: (new (init: ModelInit<Employee>) => Employee) & {
  copyOf(source: Employee, mutator: (draft: MutableModel<Employee>) => MutableModel<Employee> | void): Employee;
}

type EagerTransport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Transport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly model?: string | null;
  readonly serial?: string | null;
  readonly type?: string | null;
  readonly officeID?: string | null;
  readonly bookings?: (Booking | null)[] | null;
  readonly createdBy?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTransport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Transport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly model?: string | null;
  readonly serial?: string | null;
  readonly type?: string | null;
  readonly officeID?: string | null;
  readonly bookings: AsyncCollection<Booking>;
  readonly createdBy?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Transport = LazyLoading extends LazyLoadingDisabled ? EagerTransport : LazyTransport

export declare const Transport: (new (init: ModelInit<Transport>) => Transport) & {
  copyOf(source: Transport, mutator: (draft: MutableModel<Transport>) => MutableModel<Transport> | void): Transport;
}

type EagerBooking = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Booking, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status?: BookingStatus | keyof typeof BookingStatus | null;
  readonly code?: string | null;
  readonly agencyID: string;
  readonly officeID: string;
  readonly transport: string;
  readonly customers?: (Customer | null)[] | null;
  readonly tickets?: (Ticket | null)[] | null;
  readonly stops?: (StopBooking | null)[] | null;
  readonly departureCity: string;
  readonly arrivalCity: string;
  readonly departure?: DepartureArrivalStopFields | null;
  readonly arrival?: DepartureArrivalStopFields | null;
  readonly stock?: number | null;
  readonly price?: number | null;
  readonly createdBy?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBooking = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Booking, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status?: BookingStatus | keyof typeof BookingStatus | null;
  readonly code?: string | null;
  readonly agencyID: string;
  readonly officeID: string;
  readonly transport: string;
  readonly customers: AsyncCollection<Customer>;
  readonly tickets: AsyncCollection<Ticket>;
  readonly stops: AsyncCollection<StopBooking>;
  readonly departureCity: string;
  readonly arrivalCity: string;
  readonly departure?: DepartureArrivalStopFields | null;
  readonly arrival?: DepartureArrivalStopFields | null;
  readonly stock?: number | null;
  readonly price?: number | null;
  readonly createdBy?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Booking = LazyLoading extends LazyLoadingDisabled ? EagerBooking : LazyBooking

export declare const Booking: (new (init: ModelInit<Booking>) => Booking) & {
  copyOf(source: Booking, mutator: (draft: MutableModel<Booking>) => MutableModel<Booking> | void): Booking;
}

type EagerStopBooking = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StopBooking, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bookingID: string;
  readonly tickets?: (Ticket | null)[] | null;
  readonly arrival?: DepartureArrivalStopFields | null;
  readonly price?: number | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStopBooking = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StopBooking, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bookingID: string;
  readonly tickets: AsyncCollection<Ticket>;
  readonly arrival?: DepartureArrivalStopFields | null;
  readonly price?: number | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StopBooking = LazyLoading extends LazyLoadingDisabled ? EagerStopBooking : LazyStopBooking

export declare const StopBooking: (new (init: ModelInit<StopBooking>) => StopBooking) & {
  copyOf(source: StopBooking, mutator: (draft: MutableModel<StopBooking>) => MutableModel<StopBooking> | void): StopBooking;
}

type EagerCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly lastName?: string | null;
  readonly ci?: string | null;
  readonly email?: string | null;
  readonly bookingID?: string | null;
  readonly ticketID?: string | null;
  readonly ticket?: Ticket | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly lastName?: string | null;
  readonly ci?: string | null;
  readonly email?: string | null;
  readonly bookingID?: string | null;
  readonly ticketID?: string | null;
  readonly ticket: AsyncItem<Ticket | undefined>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Customer = LazyLoading extends LazyLoadingDisabled ? EagerCustomer : LazyCustomer

export declare const Customer: (new (init: ModelInit<Customer>) => Customer) & {
  copyOf(source: Customer, mutator: (draft: MutableModel<Customer>) => MutableModel<Customer> | void): Customer;
}

type EagerTicket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ticket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly code?: string | null;
  readonly bookingID?: string | null;
  readonly stop?: string | null;
  readonly customerID?: string | null;
  readonly seating?: string | null;
  readonly status?: string | null;
  readonly description?: string | null;
  readonly url?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly stopBookingTicketsId?: string | null;
}

type LazyTicket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ticket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly code?: string | null;
  readonly bookingID?: string | null;
  readonly stop?: string | null;
  readonly customerID?: string | null;
  readonly seating?: string | null;
  readonly status?: string | null;
  readonly description?: string | null;
  readonly url?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly stopBookingTicketsId?: string | null;
}

export declare type Ticket = LazyLoading extends LazyLoadingDisabled ? EagerTicket : LazyTicket

export declare const Ticket: (new (init: ModelInit<Ticket>) => Ticket) & {
  copyOf(source: Ticket, mutator: (draft: MutableModel<Ticket>) => MutableModel<Ticket> | void): Ticket;
}

type EagerOrderTicket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderTicket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly orderID?: string | null;
  readonly ticketID: string;
  readonly ticket?: Ticket | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderDetailOrderTicketsId?: string | null;
}

type LazyOrderTicket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderTicket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly orderID?: string | null;
  readonly ticketID: string;
  readonly ticket: AsyncItem<Ticket | undefined>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderDetailOrderTicketsId?: string | null;
}

export declare type OrderTicket = LazyLoading extends LazyLoadingDisabled ? EagerOrderTicket : LazyOrderTicket

export declare const OrderTicket: (new (init: ModelInit<OrderTicket>) => OrderTicket) & {
  copyOf(source: OrderTicket, mutator: (draft: MutableModel<OrderTicket>) => MutableModel<OrderTicket> | void): OrderTicket;
}

type EagerOrderDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: number;
  readonly paymentMethod?: string | null;
  readonly documentType?: DocumentType | keyof typeof DocumentType | null;
  readonly customerDocument?: string | null;
  readonly customerName?: string | null;
  readonly customerEmail?: string | null;
  readonly total?: number | null;
  readonly isGuest?: boolean | null;
  readonly paymentID?: string | null;
  readonly payment?: Payment | null;
  readonly bookingID?: string | null;
  readonly orderTickets?: (OrderTicket | null)[] | null;
  readonly userID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userOrdersId?: string | null;
}

type LazyOrderDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: number;
  readonly paymentMethod?: string | null;
  readonly documentType?: DocumentType | keyof typeof DocumentType | null;
  readonly customerDocument?: string | null;
  readonly customerName?: string | null;
  readonly customerEmail?: string | null;
  readonly total?: number | null;
  readonly isGuest?: boolean | null;
  readonly paymentID?: string | null;
  readonly payment: AsyncItem<Payment | undefined>;
  readonly bookingID?: string | null;
  readonly orderTickets: AsyncCollection<OrderTicket>;
  readonly userID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userOrdersId?: string | null;
}

export declare type OrderDetail = LazyLoading extends LazyLoadingDisabled ? EagerOrderDetail : LazyOrderDetail

export declare const OrderDetail: (new (init: ModelInit<OrderDetail>) => OrderDetail) & {
  copyOf(source: OrderDetail, mutator: (draft: MutableModel<OrderDetail>) => MutableModel<OrderDetail> | void): OrderDetail;
}

type EagerPayment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Payment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reference?: string | null;
  readonly amount?: number | null;
  readonly metadata?: string | null;
  readonly userID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPayment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Payment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reference?: string | null;
  readonly amount?: number | null;
  readonly metadata?: string | null;
  readonly userID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Payment = LazyLoading extends LazyLoadingDisabled ? EagerPayment : LazyPayment

export declare const Payment: (new (init: ModelInit<Payment>) => Payment) & {
  copyOf(source: Payment, mutator: (draft: MutableModel<Payment>) => MutableModel<Payment> | void): Payment;
}

type EagerorderDetailHistory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<orderDetailHistory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly orderID?: string | null;
  readonly order?: OrderDetail | null;
  readonly userID?: string | null;
  readonly owner?: string | null;
  readonly googleOwner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyorderDetailHistory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<orderDetailHistory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly orderID?: string | null;
  readonly order: AsyncItem<OrderDetail | undefined>;
  readonly userID?: string | null;
  readonly owner?: string | null;
  readonly googleOwner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type orderDetailHistory = LazyLoading extends LazyLoadingDisabled ? EagerorderDetailHistory : LazyorderDetailHistory

export declare const orderDetailHistory: (new (init: ModelInit<orderDetailHistory>) => orderDetailHistory) & {
  copyOf(source: orderDetailHistory, mutator: (draft: MutableModel<orderDetailHistory>) => MutableModel<orderDetailHistory> | void): orderDetailHistory;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email?: string | null;
  readonly status?: StatusUser | keyof typeof StatusUser | null;
  readonly notificationToken?: string | null;
  readonly previousBalance?: number | null;
  readonly orders?: (OrderDetail | null)[] | null;
  readonly owner?: string | null;
  readonly googleOwner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email?: string | null;
  readonly status?: StatusUser | keyof typeof StatusUser | null;
  readonly notificationToken?: string | null;
  readonly previousBalance?: number | null;
  readonly orders: AsyncCollection<OrderDetail>;
  readonly owner?: string | null;
  readonly googleOwner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}