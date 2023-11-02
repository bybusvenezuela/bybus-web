/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ScheduleBookingUpdateFormInputValues = {
    freq?: string[];
    owner?: string;
};
export declare type ScheduleBookingUpdateFormValidationValues = {
    freq?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ScheduleBookingUpdateFormOverridesProps = {
    ScheduleBookingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    freq?: PrimitiveOverrideProps<SelectFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ScheduleBookingUpdateFormProps = React.PropsWithChildren<{
    overrides?: ScheduleBookingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    scheduleBooking?: any;
    onSubmit?: (fields: ScheduleBookingUpdateFormInputValues) => ScheduleBookingUpdateFormInputValues;
    onSuccess?: (fields: ScheduleBookingUpdateFormInputValues) => void;
    onError?: (fields: ScheduleBookingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ScheduleBookingUpdateFormInputValues) => ScheduleBookingUpdateFormInputValues;
    onValidate?: ScheduleBookingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ScheduleBookingUpdateForm(props: ScheduleBookingUpdateFormProps): React.ReactElement;
