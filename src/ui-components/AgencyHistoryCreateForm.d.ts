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
export declare type AgencyHistoryCreateFormInputValues = {
    reason?: string;
    description?: string;
};
export declare type AgencyHistoryCreateFormValidationValues = {
    reason?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AgencyHistoryCreateFormOverridesProps = {
    AgencyHistoryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    reason?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AgencyHistoryCreateFormProps = React.PropsWithChildren<{
    overrides?: AgencyHistoryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AgencyHistoryCreateFormInputValues) => AgencyHistoryCreateFormInputValues;
    onSuccess?: (fields: AgencyHistoryCreateFormInputValues) => void;
    onError?: (fields: AgencyHistoryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AgencyHistoryCreateFormInputValues) => AgencyHistoryCreateFormInputValues;
    onValidate?: AgencyHistoryCreateFormValidationValues;
} & React.CSSProperties>;
export default function AgencyHistoryCreateForm(props: AgencyHistoryCreateFormProps): React.ReactElement;
