/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { CustomerSubscription } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CustomerSubscriptionUpdateFormInputValues = {
    name?: string;
    rif?: string;
    email?: string;
    phone?: string;
    subscriptionDate?: string;
    status?: string;
    scheduledDate?: string;
};
export declare type CustomerSubscriptionUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    rif?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    subscriptionDate?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    scheduledDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CustomerSubscriptionUpdateFormOverridesProps = {
    CustomerSubscriptionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    rif?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    subscriptionDate?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    scheduledDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CustomerSubscriptionUpdateFormProps = React.PropsWithChildren<{
    overrides?: CustomerSubscriptionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    customerSubscription?: CustomerSubscription;
    onSubmit?: (fields: CustomerSubscriptionUpdateFormInputValues) => CustomerSubscriptionUpdateFormInputValues;
    onSuccess?: (fields: CustomerSubscriptionUpdateFormInputValues) => void;
    onError?: (fields: CustomerSubscriptionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CustomerSubscriptionUpdateFormInputValues) => CustomerSubscriptionUpdateFormInputValues;
    onValidate?: CustomerSubscriptionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CustomerSubscriptionUpdateForm(props: CustomerSubscriptionUpdateFormProps): React.ReactElement;
