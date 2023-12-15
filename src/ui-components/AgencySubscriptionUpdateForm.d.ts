/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { AgencySubscription } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AgencySubscriptionUpdateFormInputValues = {
    name?: string;
    rif?: string;
    email?: string;
    phone?: string;
    subscriptionDate?: string;
    status?: string;
    scheduledDate?: string;
    agencyID?: string;
};
export declare type AgencySubscriptionUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    rif?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    subscriptionDate?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    scheduledDate?: ValidationFunction<string>;
    agencyID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AgencySubscriptionUpdateFormOverridesProps = {
    AgencySubscriptionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    rif?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    subscriptionDate?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    scheduledDate?: PrimitiveOverrideProps<TextFieldProps>;
    agencyID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AgencySubscriptionUpdateFormProps = React.PropsWithChildren<{
    overrides?: AgencySubscriptionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    agencySubscription?: AgencySubscription;
    onSubmit?: (fields: AgencySubscriptionUpdateFormInputValues) => AgencySubscriptionUpdateFormInputValues;
    onSuccess?: (fields: AgencySubscriptionUpdateFormInputValues) => void;
    onError?: (fields: AgencySubscriptionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AgencySubscriptionUpdateFormInputValues) => AgencySubscriptionUpdateFormInputValues;
    onValidate?: AgencySubscriptionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AgencySubscriptionUpdateForm(props: AgencySubscriptionUpdateFormProps): React.ReactElement;
