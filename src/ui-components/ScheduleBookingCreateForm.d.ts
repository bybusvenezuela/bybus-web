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
export declare type ScheduleBookingCreateFormInputValues = {
    freq?: string[];
    owner?: string;
};
export declare type ScheduleBookingCreateFormValidationValues = {
    freq?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ScheduleBookingCreateFormOverridesProps = {
    ScheduleBookingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    freq?: PrimitiveOverrideProps<SelectFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ScheduleBookingCreateFormProps = React.PropsWithChildren<{
    overrides?: ScheduleBookingCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ScheduleBookingCreateFormInputValues) => ScheduleBookingCreateFormInputValues;
    onSuccess?: (fields: ScheduleBookingCreateFormInputValues) => void;
    onError?: (fields: ScheduleBookingCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ScheduleBookingCreateFormInputValues) => ScheduleBookingCreateFormInputValues;
    onValidate?: ScheduleBookingCreateFormValidationValues;
} & React.CSSProperties>;
export default function ScheduleBookingCreateForm(props: ScheduleBookingCreateFormProps): React.ReactElement;
