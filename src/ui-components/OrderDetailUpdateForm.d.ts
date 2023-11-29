/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type OrderDetailUpdateFormInputValues = {
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
export declare type OrderDetailUpdateFormValidationValues = {
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
export declare type OrderDetailUpdateFormOverridesProps = {
    OrderDetailUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type OrderDetailUpdateFormProps = React.PropsWithChildren<{
    overrides?: OrderDetailUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    orderDetail?: any;
    onSubmit?: (fields: OrderDetailUpdateFormInputValues) => OrderDetailUpdateFormInputValues;
    onSuccess?: (fields: OrderDetailUpdateFormInputValues) => void;
    onError?: (fields: OrderDetailUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OrderDetailUpdateFormInputValues) => OrderDetailUpdateFormInputValues;
    onValidate?: OrderDetailUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OrderDetailUpdateForm(props: OrderDetailUpdateFormProps): React.ReactElement;
