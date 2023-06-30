/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Payment } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function PaymentCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    refenrece: "",
    amount: "",
    metadata: "",
    wallet: "",
  };
  const [refenrece, setRefenrece] = React.useState(initialValues.refenrece);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [metadata, setMetadata] = React.useState(initialValues.metadata);
  const [wallet, setWallet] = React.useState(initialValues.wallet);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setRefenrece(initialValues.refenrece);
    setAmount(initialValues.amount);
    setMetadata(initialValues.metadata);
    setWallet(initialValues.wallet);
    setErrors({});
  };
  const validations = {
    refenrece: [],
    amount: [],
    metadata: [{ type: "JSON" }],
    wallet: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          refenrece,
          amount,
          metadata,
          wallet,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Payment(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "PaymentCreateForm")}
      {...rest}
    >
      <TextField
        label="Refenrece"
        isRequired={false}
        isReadOnly={false}
        value={refenrece}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              refenrece: value,
              amount,
              metadata,
              wallet,
            };
            const result = onChange(modelFields);
            value = result?.refenrece ?? value;
          }
          if (errors.refenrece?.hasError) {
            runValidationTasks("refenrece", value);
          }
          setRefenrece(value);
        }}
        onBlur={() => runValidationTasks("refenrece", refenrece)}
        errorMessage={errors.refenrece?.errorMessage}
        hasError={errors.refenrece?.hasError}
        {...getOverrideProps(overrides, "refenrece")}
      ></TextField>
      <TextField
        label="Amount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              refenrece,
              amount: value,
              metadata,
              wallet,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
      ></TextField>
      <TextAreaField
        label="Metadata"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              refenrece,
              amount,
              metadata: value,
              wallet,
            };
            const result = onChange(modelFields);
            value = result?.metadata ?? value;
          }
          if (errors.metadata?.hasError) {
            runValidationTasks("metadata", value);
          }
          setMetadata(value);
        }}
        onBlur={() => runValidationTasks("metadata", metadata)}
        errorMessage={errors.metadata?.errorMessage}
        hasError={errors.metadata?.hasError}
        {...getOverrideProps(overrides, "metadata")}
      ></TextAreaField>
      <TextField
        label="Wallet"
        isRequired={false}
        isReadOnly={false}
        value={wallet}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              refenrece,
              amount,
              metadata,
              wallet: value,
            };
            const result = onChange(modelFields);
            value = result?.wallet ?? value;
          }
          if (errors.wallet?.hasError) {
            runValidationTasks("wallet", value);
          }
          setWallet(value);
        }}
        onBlur={() => runValidationTasks("wallet", wallet)}
        errorMessage={errors.wallet?.errorMessage}
        hasError={errors.wallet?.hasError}
        {...getOverrideProps(overrides, "wallet")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
