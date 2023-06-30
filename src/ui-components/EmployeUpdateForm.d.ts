/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Employe } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EmployeUpdateFormInputValues = {
    userID?: string;
    name?: string;
    email?: string;
    phone?: string;
    owner?: string;
    officeOwner?: string;
};
export declare type EmployeUpdateFormValidationValues = {
    userID?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    officeOwner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmployeUpdateFormOverridesProps = {
    EmployeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    officeOwner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmployeUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmployeUpdateFormOverridesProps | undefined | null;
} & {
    userID?: string;
    employe?: Employe;
    onSubmit?: (fields: EmployeUpdateFormInputValues) => EmployeUpdateFormInputValues;
    onSuccess?: (fields: EmployeUpdateFormInputValues) => void;
    onError?: (fields: EmployeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmployeUpdateFormInputValues) => EmployeUpdateFormInputValues;
    onValidate?: EmployeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmployeUpdateForm(props: EmployeUpdateFormProps): React.ReactElement;
