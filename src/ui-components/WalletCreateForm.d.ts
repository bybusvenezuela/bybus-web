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
export declare type WalletCreateFormInputValues = {
    userID?: string;
    email?: string;
    status?: string;
    notificationToken?: string;
    previousBalance?: number;
    owner?: string;
    googleOwner?: string;
};
export declare type WalletCreateFormValidationValues = {
    userID?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    notificationToken?: ValidationFunction<string>;
    previousBalance?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
    googleOwner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WalletCreateFormOverridesProps = {
    WalletCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    notificationToken?: PrimitiveOverrideProps<TextFieldProps>;
    previousBalance?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    googleOwner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WalletCreateFormProps = React.PropsWithChildren<{
    overrides?: WalletCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WalletCreateFormInputValues) => WalletCreateFormInputValues;
    onSuccess?: (fields: WalletCreateFormInputValues) => void;
    onError?: (fields: WalletCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WalletCreateFormInputValues) => WalletCreateFormInputValues;
    onValidate?: WalletCreateFormValidationValues;
} & React.CSSProperties>;
export default function WalletCreateForm(props: WalletCreateFormProps): React.ReactElement;
