/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OrderDetailCreateFormInputValues = {
    amount?: number;
    paymentMethod?: string;
    documentType?: string;
    customerDocument?: string;
    customerName?: string;
    customerEmail?: string;
    total?: number;
    isGuest?: boolean;
    status?: string;
    userID?: string;
};
export declare type OrderDetailCreateFormValidationValues = {
    amount?: ValidationFunction<number>;
    paymentMethod?: ValidationFunction<string>;
    documentType?: ValidationFunction<string>;
    customerDocument?: ValidationFunction<string>;
    customerName?: ValidationFunction<string>;
    customerEmail?: ValidationFunction<string>;
    total?: ValidationFunction<number>;
    isGuest?: ValidationFunction<boolean>;
    status?: ValidationFunction<string>;
    userID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OrderDetailCreateFormOverridesProps = {
    OrderDetailCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    paymentMethod?: PrimitiveOverrideProps<TextFieldProps>;
    documentType?: PrimitiveOverrideProps<SelectFieldProps>;
    customerDocument?: PrimitiveOverrideProps<TextFieldProps>;
    customerName?: PrimitiveOverrideProps<TextFieldProps>;
    customerEmail?: PrimitiveOverrideProps<TextFieldProps>;
    total?: PrimitiveOverrideProps<TextFieldProps>;
    isGuest?: PrimitiveOverrideProps<SwitchFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OrderDetailCreateFormProps = React.PropsWithChildren<{
    overrides?: OrderDetailCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: OrderDetailCreateFormInputValues) => OrderDetailCreateFormInputValues;
    onSuccess?: (fields: OrderDetailCreateFormInputValues) => void;
    onError?: (fields: OrderDetailCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OrderDetailCreateFormInputValues) => OrderDetailCreateFormInputValues;
    onValidate?: OrderDetailCreateFormValidationValues;
} & React.CSSProperties>;
export default function OrderDetailCreateForm(props: OrderDetailCreateFormProps): React.ReactElement;
