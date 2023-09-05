/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OrderDetailUpdateFormInputValues = {
    amount?: number;
    paymentMethod?: string;
    customerName?: string;
    customerEmail?: string;
    isGuest?: boolean;
    userID?: string;
};
export declare type OrderDetailUpdateFormValidationValues = {
    amount?: ValidationFunction<number>;
    paymentMethod?: ValidationFunction<string>;
    customerName?: ValidationFunction<string>;
    customerEmail?: ValidationFunction<string>;
    isGuest?: ValidationFunction<boolean>;
    userID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OrderDetailUpdateFormOverridesProps = {
    OrderDetailUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    paymentMethod?: PrimitiveOverrideProps<TextFieldProps>;
    customerName?: PrimitiveOverrideProps<TextFieldProps>;
    customerEmail?: PrimitiveOverrideProps<TextFieldProps>;
    isGuest?: PrimitiveOverrideProps<SwitchFieldProps>;
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
