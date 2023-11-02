/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TransportUpdateFormInputValues = {
    model?: string;
    serial?: string;
    type?: string;
    createdBy?: string;
};
export declare type TransportUpdateFormValidationValues = {
    model?: ValidationFunction<string>;
    serial?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransportUpdateFormOverridesProps = {
    TransportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    model?: PrimitiveOverrideProps<TextFieldProps>;
    serial?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TransportUpdateFormProps = React.PropsWithChildren<{
    overrides?: TransportUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    transport?: any;
    onSubmit?: (fields: TransportUpdateFormInputValues) => TransportUpdateFormInputValues;
    onSuccess?: (fields: TransportUpdateFormInputValues) => void;
    onError?: (fields: TransportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TransportUpdateFormInputValues) => TransportUpdateFormInputValues;
    onValidate?: TransportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TransportUpdateForm(props: TransportUpdateFormProps): React.ReactElement;
