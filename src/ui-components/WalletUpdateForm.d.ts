/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Wallet } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WalletUpdateFormInputValues = {
    userID?: string;
    email?: string;
    status?: string;
    notificationToken?: string;
    previousBalance?: number;
    owner?: string;
    googleOwner?: string;
};
export declare type WalletUpdateFormValidationValues = {
    userID?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    notificationToken?: ValidationFunction<string>;
    previousBalance?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
    googleOwner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WalletUpdateFormOverridesProps = {
    WalletUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    notificationToken?: PrimitiveOverrideProps<TextFieldProps>;
    previousBalance?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    googleOwner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WalletUpdateFormProps = React.PropsWithChildren<{
    overrides?: WalletUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    wallet?: Wallet;
    onSubmit?: (fields: WalletUpdateFormInputValues) => WalletUpdateFormInputValues;
    onSuccess?: (fields: WalletUpdateFormInputValues) => void;
    onError?: (fields: WalletUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WalletUpdateFormInputValues) => WalletUpdateFormInputValues;
    onValidate?: WalletUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WalletUpdateForm(props: WalletUpdateFormProps): React.ReactElement;
