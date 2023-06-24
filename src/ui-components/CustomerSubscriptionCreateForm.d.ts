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
export declare type CustomerSubscriptionCreateFormInputValues = {
    name?: string;
    rif?: string;
    email?: string;
    phone?: string;
    subscriptionDate?: string;
    status?: string;
    scheduledDate?: string;
};
export declare type CustomerSubscriptionCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    rif?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    subscriptionDate?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    scheduledDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CustomerSubscriptionCreateFormOverridesProps = {
    CustomerSubscriptionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    rif?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    subscriptionDate?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    scheduledDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CustomerSubscriptionCreateFormProps = React.PropsWithChildren<{
    overrides?: CustomerSubscriptionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CustomerSubscriptionCreateFormInputValues) => CustomerSubscriptionCreateFormInputValues;
    onSuccess?: (fields: CustomerSubscriptionCreateFormInputValues) => void;
    onError?: (fields: CustomerSubscriptionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CustomerSubscriptionCreateFormInputValues) => CustomerSubscriptionCreateFormInputValues;
    onValidate?: CustomerSubscriptionCreateFormValidationValues;
} & React.CSSProperties>;
export default function CustomerSubscriptionCreateForm(props: CustomerSubscriptionCreateFormProps): React.ReactElement;
