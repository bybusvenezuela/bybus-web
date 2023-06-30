/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BookingCreateFormInputValues = {
    code?: string;
    agencyID?: string;
    officeID?: string;
    departureDate?: string;
    arrivalDate?: string;
    estimatedTime?: string;
    departureLoc?: string;
    destinationLoc?: string;
    service?: string;
    owner?: string;
    officeOwner?: string;
};
export declare type BookingCreateFormValidationValues = {
    code?: ValidationFunction<string>;
    agencyID?: ValidationFunction<string>;
    officeID?: ValidationFunction<string>;
    departureDate?: ValidationFunction<string>;
    arrivalDate?: ValidationFunction<string>;
    estimatedTime?: ValidationFunction<string>;
    departureLoc?: ValidationFunction<string>;
    destinationLoc?: ValidationFunction<string>;
    service?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    officeOwner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BookingCreateFormOverridesProps = {
    BookingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    code?: PrimitiveOverrideProps<TextFieldProps>;
    agencyID?: PrimitiveOverrideProps<TextFieldProps>;
    officeID?: PrimitiveOverrideProps<TextFieldProps>;
    departureDate?: PrimitiveOverrideProps<TextFieldProps>;
    arrivalDate?: PrimitiveOverrideProps<TextFieldProps>;
    estimatedTime?: PrimitiveOverrideProps<TextFieldProps>;
    departureLoc?: PrimitiveOverrideProps<TextFieldProps>;
    destinationLoc?: PrimitiveOverrideProps<TextFieldProps>;
    service?: PrimitiveOverrideProps<SelectFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    officeOwner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BookingCreateFormProps = React.PropsWithChildren<{
    overrides?: BookingCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BookingCreateFormInputValues) => BookingCreateFormInputValues;
    onSuccess?: (fields: BookingCreateFormInputValues) => void;
    onError?: (fields: BookingCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BookingCreateFormInputValues) => BookingCreateFormInputValues;
    onValidate?: BookingCreateFormValidationValues;
} & React.CSSProperties>;
export default function BookingCreateForm(props: BookingCreateFormProps): React.ReactElement;
