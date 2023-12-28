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
export declare type TicketUpdateFormInputValues = {
    code?: string;
    orderDetailID?: string;
    stop?: string;
    seating?: string;
    status?: string;
    description?: string;
    url?: string;
    owner?: string;
};
export declare type TicketUpdateFormValidationValues = {
    code?: ValidationFunction<string>;
    orderDetailID?: ValidationFunction<string>;
    stop?: ValidationFunction<string>;
    seating?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TicketUpdateFormOverridesProps = {
    TicketUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    code?: PrimitiveOverrideProps<TextFieldProps>;
    orderDetailID?: PrimitiveOverrideProps<TextFieldProps>;
    stop?: PrimitiveOverrideProps<TextFieldProps>;
    seating?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TicketUpdateFormProps = React.PropsWithChildren<{
    overrides?: TicketUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    ticket?: any;
    onSubmit?: (fields: TicketUpdateFormInputValues) => TicketUpdateFormInputValues;
    onSuccess?: (fields: TicketUpdateFormInputValues) => void;
    onError?: (fields: TicketUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TicketUpdateFormInputValues) => TicketUpdateFormInputValues;
    onValidate?: TicketUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TicketUpdateForm(props: TicketUpdateFormProps): React.ReactElement;
