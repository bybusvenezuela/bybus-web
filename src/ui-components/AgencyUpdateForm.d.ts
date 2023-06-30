/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Agency } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AgencyUpdateFormInputValues = {
    userID?: string;
    name?: string;
    rif?: string;
    email?: string;
    phone?: string;
    owner?: string;
};
export declare type AgencyUpdateFormValidationValues = {
    userID?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    rif?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AgencyUpdateFormOverridesProps = {
    AgencyUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    rif?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AgencyUpdateFormProps = React.PropsWithChildren<{
    overrides?: AgencyUpdateFormOverridesProps | undefined | null;
} & {
    userID?: string;
    agency?: Agency;
    onSubmit?: (fields: AgencyUpdateFormInputValues) => AgencyUpdateFormInputValues;
    onSuccess?: (fields: AgencyUpdateFormInputValues) => void;
    onError?: (fields: AgencyUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AgencyUpdateFormInputValues) => AgencyUpdateFormInputValues;
    onValidate?: AgencyUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AgencyUpdateForm(props: AgencyUpdateFormProps): React.ReactElement;
