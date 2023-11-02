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
export declare type OfficeUpdateFormInputValues = {
    name?: string;
    state?: string;
    city?: string;
    address?: string;
    email?: string;
    phone?: string;
    status?: string;
    owner?: string;
};
export declare type OfficeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OfficeUpdateFormOverridesProps = {
    OfficeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OfficeUpdateFormProps = React.PropsWithChildren<{
    overrides?: OfficeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    office?: any;
    onSubmit?: (fields: OfficeUpdateFormInputValues) => OfficeUpdateFormInputValues;
    onSuccess?: (fields: OfficeUpdateFormInputValues) => void;
    onError?: (fields: OfficeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OfficeUpdateFormInputValues) => OfficeUpdateFormInputValues;
    onValidate?: OfficeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OfficeUpdateForm(props: OfficeUpdateFormProps): React.ReactElement;
