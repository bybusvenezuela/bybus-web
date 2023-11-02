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
export declare type EmployeeUpdateFormInputValues = {
    name?: string;
    email?: string;
    phone?: string;
    pin?: string;
    type?: string;
    status?: string;
    owner?: string;
    lastConnection?: string;
};
export declare type EmployeeUpdateFormValidationValues = {
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
export declare type EmployeeUpdateFormOverridesProps = {
    EmployeeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    pin?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    lastConnection?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmployeeUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmployeeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    employee?: any;
    onSubmit?: (fields: EmployeeUpdateFormInputValues) => EmployeeUpdateFormInputValues;
    onSuccess?: (fields: EmployeeUpdateFormInputValues) => void;
    onError?: (fields: EmployeeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmployeeUpdateFormInputValues) => EmployeeUpdateFormInputValues;
    onValidate?: EmployeeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmployeeUpdateForm(props: EmployeeUpdateFormProps): React.ReactElement;
