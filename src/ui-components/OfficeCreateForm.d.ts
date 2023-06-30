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
export declare type OfficeCreateFormInputValues = {
    state?: string;
    city?: string;
    address?: string;
    email?: string;
    phone?: string;
    owner?: string;
};
export declare type OfficeCreateFormValidationValues = {
    state?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OfficeCreateFormOverridesProps = {
    OfficeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OfficeCreateFormProps = React.PropsWithChildren<{
    overrides?: OfficeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: OfficeCreateFormInputValues) => OfficeCreateFormInputValues;
    onSuccess?: (fields: OfficeCreateFormInputValues) => void;
    onError?: (fields: OfficeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OfficeCreateFormInputValues) => OfficeCreateFormInputValues;
    onValidate?: OfficeCreateFormValidationValues;
} & React.CSSProperties>;
export default function OfficeCreateForm(props: OfficeCreateFormProps): React.ReactElement;
