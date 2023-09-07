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
export declare type StateUpdateFormInputValues = {
    name?: string;
    cities?: string[];
};
export declare type StateUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    cities?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StateUpdateFormOverridesProps = {
    StateUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    cities?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StateUpdateFormProps = React.PropsWithChildren<{
    overrides?: StateUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    state?: any;
    onSubmit?: (fields: StateUpdateFormInputValues) => StateUpdateFormInputValues;
    onSuccess?: (fields: StateUpdateFormInputValues) => void;
    onError?: (fields: StateUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StateUpdateFormInputValues) => StateUpdateFormInputValues;
    onValidate?: StateUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StateUpdateForm(props: StateUpdateFormProps): React.ReactElement;
