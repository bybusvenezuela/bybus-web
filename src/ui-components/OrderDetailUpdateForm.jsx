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
  SelectField,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getOrderDetail } from "../graphql/queries";
import { updateOrderDetail } from "../graphql/mutations";
const client = generateClient();
export default function OrderDetailUpdateForm(props) {
  const {
    id: idProp,
    orderDetail: orderDetailModelProp,
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
    documentType: "",
    customerDocument: "",
    customerName: "",
    customerEmail: "",
    total: "",
    isGuest: false,
    status: "",
    userID: "",
  };
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [paymentMethod, setPaymentMethod] = React.useState(
    initialValues.paymentMethod
  );
  const [documentType, setDocumentType] = React.useState(
    initialValues.documentType
  );
  const [customerDocument, setCustomerDocument] = React.useState(
    initialValues.customerDocument
  );
  const [customerName, setCustomerName] = React.useState(
    initialValues.customerName
  );
  const [customerEmail, setCustomerEmail] = React.useState(
    initialValues.customerEmail
  );
  const [total, setTotal] = React.useState(initialValues.total);
  const [isGuest, setIsGuest] = React.useState(initialValues.isGuest);
  const [status, setStatus] = React.useState(initialValues.status);
  const [userID, setUserID] = React.useState(initialValues.userID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = orderDetailRecord
      ? { ...initialValues, ...orderDetailRecord }
      : initialValues;
    setAmount(cleanValues.amount);
    setPaymentMethod(cleanValues.paymentMethod);
    setDocumentType(cleanValues.documentType);
    setCustomerDocument(cleanValues.customerDocument);
    setCustomerName(cleanValues.customerName);
    setCustomerEmail(cleanValues.customerEmail);
    setTotal(cleanValues.total);
    setIsGuest(cleanValues.isGuest);
    setStatus(cleanValues.status);
    setUserID(cleanValues.userID);
    setErrors({});
  };
  const [orderDetailRecord, setOrderDetailRecord] =
    React.useState(orderDetailModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getOrderDetail.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getOrderDetail
        : orderDetailModelProp;
      setOrderDetailRecord(record);
    };
    queryData();
  }, [idProp, orderDetailModelProp]);
  React.useEffect(resetStateValues, [orderDetailRecord]);
  const validations = {
    amount: [{ type: "Required" }],
    paymentMethod: [],
    documentType: [],
    customerDocument: [],
    customerName: [],
    customerEmail: [],
    total: [],
    isGuest: [],
    status: [],
    userID: [],
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
          paymentMethod: paymentMethod ?? null,
          documentType: documentType ?? null,
          customerDocument: customerDocument ?? null,
          customerName: customerName ?? null,
          customerEmail: customerEmail ?? null,
          total: total ?? null,
          isGuest: isGuest ?? null,
          status: status ?? null,
          userID: userID ?? null,
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
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateOrderDetail.replaceAll("__typename", ""),
            variables: {
              input: {
                id: orderDetailRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "OrderDetailUpdateForm")}
      {...rest}
    >
      <TextField
        label="Amount"
        isRequired={true}
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
              documentType,
              customerDocument,
              customerName,
              customerEmail,
              total,
              isGuest,
              status,
              userID,
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
              documentType,
              customerDocument,
              customerName,
              customerEmail,
              total,
              isGuest,
              status,
              userID,
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
      <SelectField
        label="Document type"
        placeholder="Please select an option"
        isDisabled={false}
        value={documentType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              paymentMethod,
              documentType: value,
              customerDocument,
              customerName,
              customerEmail,
              total,
              isGuest,
              status,
              userID,
            };
            const result = onChange(modelFields);
            value = result?.documentType ?? value;
          }
          if (errors.documentType?.hasError) {
            runValidationTasks("documentType", value);
          }
          setDocumentType(value);
        }}
        onBlur={() => runValidationTasks("documentType", documentType)}
        errorMessage={errors.documentType?.errorMessage}
        hasError={errors.documentType?.hasError}
        {...getOverrideProps(overrides, "documentType")}
      >
        <option
          children="V"
          value="V"
          {...getOverrideProps(overrides, "documentTypeoption0")}
        ></option>
        <option
          children="E"
          value="E"
          {...getOverrideProps(overrides, "documentTypeoption1")}
        ></option>
        <option
          children="P"
          value="P"
          {...getOverrideProps(overrides, "documentTypeoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Customer document"
        isRequired={false}
        isReadOnly={false}
        value={customerDocument}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              paymentMethod,
              documentType,
              customerDocument: value,
              customerName,
              customerEmail,
              total,
              isGuest,
              status,
              userID,
            };
            const result = onChange(modelFields);
            value = result?.customerDocument ?? value;
          }
          if (errors.customerDocument?.hasError) {
            runValidationTasks("customerDocument", value);
          }
          setCustomerDocument(value);
        }}
        onBlur={() => runValidationTasks("customerDocument", customerDocument)}
        errorMessage={errors.customerDocument?.errorMessage}
        hasError={errors.customerDocument?.hasError}
        {...getOverrideProps(overrides, "customerDocument")}
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
              documentType,
              customerDocument,
              customerName: value,
              customerEmail,
              total,
              isGuest,
              status,
              userID,
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
              documentType,
              customerDocument,
              customerName,
              customerEmail: value,
              total,
              isGuest,
              status,
              userID,
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
      <TextField
        label="Total"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={total}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              amount,
              paymentMethod,
              documentType,
              customerDocument,
              customerName,
              customerEmail,
              total: value,
              isGuest,
              status,
              userID,
            };
            const result = onChange(modelFields);
            value = result?.total ?? value;
          }
          if (errors.total?.hasError) {
            runValidationTasks("total", value);
          }
          setTotal(value);
        }}
        onBlur={() => runValidationTasks("total", total)}
        errorMessage={errors.total?.errorMessage}
        hasError={errors.total?.hasError}
        {...getOverrideProps(overrides, "total")}
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
              documentType,
              customerDocument,
              customerName,
              customerEmail,
              total,
              isGuest: value,
              status,
              userID,
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
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              paymentMethod,
              documentType,
              customerDocument,
              customerName,
              customerEmail,
              total,
              isGuest,
              status: value,
              userID,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={userID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              paymentMethod,
              documentType,
              customerDocument,
              customerName,
              customerEmail,
              total,
              isGuest,
              status,
              userID: value,
            };
            const result = onChange(modelFields);
            value = result?.userID ?? value;
          }
          if (errors.userID?.hasError) {
            runValidationTasks("userID", value);
          }
          setUserID(value);
        }}
        onBlur={() => runValidationTasks("userID", userID)}
        errorMessage={errors.userID?.errorMessage}
        hasError={errors.userID?.hasError}
        {...getOverrideProps(overrides, "userID")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || orderDetailModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || orderDetailModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
