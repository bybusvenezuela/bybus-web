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
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { AgencySubscription } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function AgencySubscriptionCreateForm(props) {
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
    name: "",
    rif: "",
    email: "",
    phone: "",
    subscriptionDate: "",
    status: "",
    scheduledDate: "",
    agencyID: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [rif, setRif] = React.useState(initialValues.rif);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [subscriptionDate, setSubscriptionDate] = React.useState(
    initialValues.subscriptionDate
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [scheduledDate, setScheduledDate] = React.useState(
    initialValues.scheduledDate
  );
  const [agencyID, setAgencyID] = React.useState(initialValues.agencyID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setRif(initialValues.rif);
    setEmail(initialValues.email);
    setPhone(initialValues.phone);
    setSubscriptionDate(initialValues.subscriptionDate);
    setStatus(initialValues.status);
    setScheduledDate(initialValues.scheduledDate);
    setAgencyID(initialValues.agencyID);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    rif: [{ type: "Required" }],
    email: [{ type: "Required" }],
    phone: [{ type: "Required" }],
    subscriptionDate: [],
    status: [],
    scheduledDate: [],
    agencyID: [],
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
          name,
          rif,
          email,
          phone,
          subscriptionDate,
          status,
          scheduledDate,
          agencyID,
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
          await DataStore.save(new AgencySubscription(modelFields));
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
      {...getOverrideProps(overrides, "AgencySubscriptionCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              rif,
              email,
              phone,
              subscriptionDate,
              status,
              scheduledDate,
              agencyID,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Rif"
        isRequired={true}
        isReadOnly={false}
        value={rif}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              rif: value,
              email,
              phone,
              subscriptionDate,
              status,
              scheduledDate,
              agencyID,
            };
            const result = onChange(modelFields);
            value = result?.rif ?? value;
          }
          if (errors.rif?.hasError) {
            runValidationTasks("rif", value);
          }
          setRif(value);
        }}
        onBlur={() => runValidationTasks("rif", rif)}
        errorMessage={errors.rif?.errorMessage}
        hasError={errors.rif?.hasError}
        {...getOverrideProps(overrides, "rif")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              rif,
              email: value,
              phone,
              subscriptionDate,
              status,
              scheduledDate,
              agencyID,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={true}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              rif,
              email,
              phone: value,
              subscriptionDate,
              status,
              scheduledDate,
              agencyID,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Subscription date"
        isRequired={false}
        isReadOnly={false}
        value={subscriptionDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              rif,
              email,
              phone,
              subscriptionDate: value,
              status,
              scheduledDate,
              agencyID,
            };
            const result = onChange(modelFields);
            value = result?.subscriptionDate ?? value;
          }
          if (errors.subscriptionDate?.hasError) {
            runValidationTasks("subscriptionDate", value);
          }
          setSubscriptionDate(value);
        }}
        onBlur={() => runValidationTasks("subscriptionDate", subscriptionDate)}
        errorMessage={errors.subscriptionDate?.errorMessage}
        hasError={errors.subscriptionDate?.hasError}
        {...getOverrideProps(overrides, "subscriptionDate")}
      ></TextField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              rif,
              email,
              phone,
              subscriptionDate,
              status: value,
              scheduledDate,
              agencyID,
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
      >
        <option
          children="Pending"
          value="PENDING"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Accepted"
          value="ACCEPTED"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Rejected"
          value="REJECTED"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
        <option
          children="Scheduled"
          value="SCHEDULED"
          {...getOverrideProps(overrides, "statusoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Scheduled date"
        isRequired={false}
        isReadOnly={false}
        value={scheduledDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              rif,
              email,
              phone,
              subscriptionDate,
              status,
              scheduledDate: value,
              agencyID,
            };
            const result = onChange(modelFields);
            value = result?.scheduledDate ?? value;
          }
          if (errors.scheduledDate?.hasError) {
            runValidationTasks("scheduledDate", value);
          }
          setScheduledDate(value);
        }}
        onBlur={() => runValidationTasks("scheduledDate", scheduledDate)}
        errorMessage={errors.scheduledDate?.errorMessage}
        hasError={errors.scheduledDate?.hasError}
        {...getOverrideProps(overrides, "scheduledDate")}
      ></TextField>
      <TextField
        label="Agency id"
        isRequired={false}
        isReadOnly={false}
        value={agencyID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              rif,
              email,
              phone,
              subscriptionDate,
              status,
              scheduledDate,
              agencyID: value,
            };
            const result = onChange(modelFields);
            value = result?.agencyID ?? value;
          }
          if (errors.agencyID?.hasError) {
            runValidationTasks("agencyID", value);
          }
          setAgencyID(value);
        }}
        onBlur={() => runValidationTasks("agencyID", agencyID)}
        errorMessage={errors.agencyID?.errorMessage}
        hasError={errors.agencyID?.hasError}
        {...getOverrideProps(overrides, "agencyID")}
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
