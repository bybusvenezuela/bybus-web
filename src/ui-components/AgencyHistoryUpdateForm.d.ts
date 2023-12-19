/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { AgencyHistory } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AgencyHistoryUpdateFormInputValues = {
    reason?: string;
    description?: string;
};
export declare type AgencyHistoryUpdateFormValidationValues = {
    reason?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AgencyHistoryUpdateFormOverridesProps = {
    AgencyHistoryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    reason?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AgencyHistoryUpdateFormProps = React.PropsWithChildren<{
    overrides?: AgencyHistoryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    agencyHistory?: AgencyHistory;
    onSubmit?: (fields: AgencyHistoryUpdateFormInputValues) => AgencyHistoryUpdateFormInputValues;
    onSuccess?: (fields: AgencyHistoryUpdateFormInputValues) => void;
    onError?: (fields: AgencyHistoryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AgencyHistoryUpdateFormInputValues) => AgencyHistoryUpdateFormInputValues;
    onValidate?: AgencyHistoryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AgencyHistoryUpdateForm(props: AgencyHistoryUpdateFormProps): React.ReactElement;
