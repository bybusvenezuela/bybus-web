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
export declare type EmailSusbcriptionCreateFormInputValues = {
    email?: string;
};
export declare type EmailSusbcriptionCreateFormValidationValues = {
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailSusbcriptionCreateFormOverridesProps = {
    EmailSusbcriptionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmailSusbcriptionCreateFormProps = React.PropsWithChildren<{
    overrides?: EmailSusbcriptionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmailSusbcriptionCreateFormInputValues) => EmailSusbcriptionCreateFormInputValues;
    onSuccess?: (fields: EmailSusbcriptionCreateFormInputValues) => void;
    onError?: (fields: EmailSusbcriptionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailSusbcriptionCreateFormInputValues) => EmailSusbcriptionCreateFormInputValues;
    onValidate?: EmailSusbcriptionCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmailSusbcriptionCreateForm(props: EmailSusbcriptionCreateFormProps): React.ReactElement;
