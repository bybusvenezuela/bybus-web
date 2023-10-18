/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Office } from "../models";
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
    owner?: string;
};
export declare type OfficeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
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
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OfficeUpdateFormProps = React.PropsWithChildren<{
    overrides?: OfficeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    office?: Office;
    onSubmit?: (fields: OfficeUpdateFormInputValues) => OfficeUpdateFormInputValues;
    onSuccess?: (fields: OfficeUpdateFormInputValues) => void;
    onError?: (fields: OfficeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OfficeUpdateFormInputValues) => OfficeUpdateFormInputValues;
    onValidate?: OfficeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OfficeUpdateForm(props: OfficeUpdateFormProps): React.ReactElement;
