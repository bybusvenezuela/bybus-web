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
export declare type AgencyUpdateFormInputValues = {
    cognitoID?: string;
    pin?: string;
    name?: string;
    rif?: string;
    email?: string;
    phone?: string;
    percentage?: number;
    status?: string;
    owner?: string;
};
export declare type AgencyUpdateFormValidationValues = {
    cognitoID?: ValidationFunction<string>;
    pin?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    rif?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    percentage?: ValidationFunction<number>;
    status?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AgencyUpdateFormOverridesProps = {
    AgencyUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cognitoID?: PrimitiveOverrideProps<TextFieldProps>;
    pin?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    rif?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    percentage?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AgencyUpdateFormProps = React.PropsWithChildren<{
    overrides?: AgencyUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    agency?: any;
    onSubmit?: (fields: AgencyUpdateFormInputValues) => AgencyUpdateFormInputValues;
    onSuccess?: (fields: AgencyUpdateFormInputValues) => void;
    onError?: (fields: AgencyUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AgencyUpdateFormInputValues) => AgencyUpdateFormInputValues;
    onValidate?: AgencyUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AgencyUpdateForm(props: AgencyUpdateFormProps): React.ReactElement;
