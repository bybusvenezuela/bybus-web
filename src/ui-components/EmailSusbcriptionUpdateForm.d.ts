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
export declare type EmailSusbcriptionUpdateFormInputValues = {
    email?: string;
};
export declare type EmailSusbcriptionUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailSusbcriptionUpdateFormOverridesProps = {
    EmailSusbcriptionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmailSusbcriptionUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmailSusbcriptionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    emailSusbcription?: any;
    onSubmit?: (fields: EmailSusbcriptionUpdateFormInputValues) => EmailSusbcriptionUpdateFormInputValues;
    onSuccess?: (fields: EmailSusbcriptionUpdateFormInputValues) => void;
    onError?: (fields: EmailSusbcriptionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailSusbcriptionUpdateFormInputValues) => EmailSusbcriptionUpdateFormInputValues;
    onValidate?: EmailSusbcriptionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmailSusbcriptionUpdateForm(props: EmailSusbcriptionUpdateFormProps): React.ReactElement;
