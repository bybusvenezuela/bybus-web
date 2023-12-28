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
export declare type EmployeeCreateFormInputValues = {
    name?: string;
    email?: string;
    phone?: string;
    pin?: string;
    type?: string;
    status?: string;
    owner?: string;
    lastConnection?: string;
};
export declare type EmployeeCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    pin?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    lastConnection?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmployeeCreateFormOverridesProps = {
    EmployeeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    pin?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    lastConnection?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmployeeCreateFormProps = React.PropsWithChildren<{
    overrides?: EmployeeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmployeeCreateFormInputValues) => EmployeeCreateFormInputValues;
    onSuccess?: (fields: EmployeeCreateFormInputValues) => void;
    onError?: (fields: EmployeeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmployeeCreateFormInputValues) => EmployeeCreateFormInputValues;
    onValidate?: EmployeeCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmployeeCreateForm(props: EmployeeCreateFormProps): React.ReactElement;
