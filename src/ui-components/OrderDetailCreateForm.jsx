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
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { OrderDetail } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function OrderDetailCreateForm(props) {
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
    amount: "",
    paymentMethod: "",
    customerName: "",
    customerEmail: "",
    isGuest: false,
    walletID: "",
  };
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [paymentMethod, setPaymentMethod] = React.useState(
    initialValues.paymentMethod
  );
  const [customerName, setCustomerName] = React.useState(
    initialValues.customerName
  );
  const [customerEmail, setCustomerEmail] = React.useState(
    initialValues.customerEmail
  );
  const [isGuest, setIsGuest] = React.useState(initialValues.isGuest);
  const [walletID, setWalletID] = React.useState(initialValues.walletID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setAmount(initialValues.amount);
    setPaymentMethod(initialValues.paymentMethod);
    setCustomerName(initialValues.customerName);
    setCustomerEmail(initialValues.customerEmail);
    setIsGuest(initialValues.isGuest);
    setWalletID(initialValues.walletID);
    setErrors({});
  };
  const validations = {
    amount: [],
    paymentMethod: [],
    customerName: [],
    customerEmail: [],
    isGuest: [],
    walletID: [],
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
          amount,
          paymentMethod,
          customerName,
          customerEmail,
          isGuest,
          walletID,
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
          await DataStore.save(new OrderDetail(modelFields));
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
      {...getOverrideProps(overrides, "OrderDetailCreateForm")}
      {...rest}
    >
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
              amount: value,
              paymentMethod,
              customerName,
              customerEmail,
              isGuest,
              walletID,
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
      <TextField
        label="Payment method"
        isRequired={false}
        isReadOnly={false}
        value={paymentMethod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              paymentMethod: value,
              customerName,
              customerEmail,
              isGuest,
              walletID,
            };
            const result = onChange(modelFields);
            value = result?.paymentMethod ?? value;
          }
          if (errors.paymentMethod?.hasError) {
            runValidationTasks("paymentMethod", value);
          }
          setPaymentMethod(value);
        }}
        onBlur={() => runValidationTasks("paymentMethod", paymentMethod)}
        errorMessage={errors.paymentMethod?.errorMessage}
        hasError={errors.paymentMethod?.hasError}
        {...getOverrideProps(overrides, "paymentMethod")}
      ></TextField>
      <TextField
        label="Customer name"
        isRequired={false}
        isReadOnly={false}
        value={customerName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              paymentMethod,
              customerName: value,
              customerEmail,
              isGuest,
              walletID,
            };
            const result = onChange(modelFields);
            value = result?.customerName ?? value;
          }
          if (errors.customerName?.hasError) {
            runValidationTasks("customerName", value);
          }
          setCustomerName(value);
        }}
        onBlur={() => runValidationTasks("customerName", customerName)}
        errorMessage={errors.customerName?.errorMessage}
        hasError={errors.customerName?.hasError}
        {...getOverrideProps(overrides, "customerName")}
      ></TextField>
      <TextField
        label="Customer email"
        isRequired={false}
        isReadOnly={false}
        value={customerEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              paymentMethod,
              customerName,
              customerEmail: value,
              isGuest,
              walletID,
            };
            const result = onChange(modelFields);
            value = result?.customerEmail ?? value;
          }
          if (errors.customerEmail?.hasError) {
            runValidationTasks("customerEmail", value);
          }
          setCustomerEmail(value);
        }}
        onBlur={() => runValidationTasks("customerEmail", customerEmail)}
        errorMessage={errors.customerEmail?.errorMessage}
        hasError={errors.customerEmail?.hasError}
        {...getOverrideProps(overrides, "customerEmail")}
      ></TextField>
      <SwitchField
        label="Is guest"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isGuest}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              amount,
              paymentMethod,
              customerName,
              customerEmail,
              isGuest: value,
              walletID,
            };
            const result = onChange(modelFields);
            value = result?.isGuest ?? value;
          }
          if (errors.isGuest?.hasError) {
            runValidationTasks("isGuest", value);
          }
          setIsGuest(value);
        }}
        onBlur={() => runValidationTasks("isGuest", isGuest)}
        errorMessage={errors.isGuest?.errorMessage}
        hasError={errors.isGuest?.hasError}
        {...getOverrideProps(overrides, "isGuest")}
      ></SwitchField>
      <TextField
        label="Wallet id"
        isRequired={false}
        isReadOnly={false}
        value={walletID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              paymentMethod,
              customerName,
              customerEmail,
              isGuest,
              walletID: value,
            };
            const result = onChange(modelFields);
            value = result?.walletID ?? value;
          }
          if (errors.walletID?.hasError) {
            runValidationTasks("walletID", value);
          }
          setWalletID(value);
        }}
        onBlur={() => runValidationTasks("walletID", walletID)}
        errorMessage={errors.walletID?.errorMessage}
        hasError={errors.walletID?.hasError}
        {...getOverrideProps(overrides, "walletID")}
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
