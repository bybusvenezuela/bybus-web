/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AgencyCreateFormInputValues = {
    cognitoID?: string;
    pin?: string;
    name?: string;
    rif?: string;
    email?: string;
    phone?: string;
    owner?: string;
};
export declare type AgencyCreateFormValidationValues = {
    cognitoID?: ValidationFunction<string>;
    pin?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    rif?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AgencyCreateFormOverridesProps = {
    AgencyCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cognitoID?: PrimitiveOverrideProps<TextFieldProps>;
    pin?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    rif?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AgencyCreateFormProps = React.PropsWithChildren<{
    overrides?: AgencyCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AgencyCreateFormInputValues) => AgencyCreateFormInputValues;
    onSuccess?: (fields: AgencyCreateFormInputValues) => void;
    onError?: (fields: AgencyCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AgencyCreateFormInputValues) => AgencyCreateFormInputValues;
    onValidate?: AgencyCreateFormValidationValues;
} & React.CSSProperties>;
export default function AgencyCreateForm(props: AgencyCreateFormProps): React.ReactElement;
