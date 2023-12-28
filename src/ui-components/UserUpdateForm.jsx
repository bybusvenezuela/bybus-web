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
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
const client = generateClient();
export default function UserUpdateForm(props) {
  const {
    id: idProp,
    user: userModelProp,
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
    email: "",
    status: "",
    notificationToken: "",
    previousBalance: "",
    owner: "",
    googleOwner: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [email, setEmail] = React.useState(initialValues.email);
  const [status, setStatus] = React.useState(initialValues.status);
  const [notificationToken, setNotificationToken] = React.useState(
    initialValues.notificationToken
  );
  const [previousBalance, setPreviousBalance] = React.useState(
    initialValues.previousBalance
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [googleOwner, setGoogleOwner] = React.useState(
    initialValues.googleOwner
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setName(cleanValues.name);
    setEmail(cleanValues.email);
    setStatus(cleanValues.status);
    setNotificationToken(cleanValues.notificationToken);
    setPreviousBalance(cleanValues.previousBalance);
    setOwner(cleanValues.owner);
    setGoogleOwner(cleanValues.googleOwner);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUser.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUser
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [idProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const validations = {
    name: [{ type: "Required" }],
    email: [],
    status: [],
    notificationToken: [],
    previousBalance: [],
    owner: [],
    googleOwner: [],
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
          email: email ?? null,
          status: status ?? null,
          notificationToken: notificationToken ?? null,
          previousBalance: previousBalance ?? null,
          owner: owner ?? null,
          googleOwner: googleOwner ?? null,
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
            query: updateUser.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userRecord.id,
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
      {...getOverrideProps(overrides, "UserUpdateForm")}
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
              email,
              status,
              notificationToken,
              previousBalance,
              owner,
              googleOwner,
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
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email: value,
              status,
              notificationToken,
              previousBalance,
              owner,
              googleOwner,
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
              email,
              status: value,
              notificationToken,
              previousBalance,
              owner,
              googleOwner,
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
          children="Allowed"
          value="ALLOWED"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Denied"
          value="DENIED"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Notification token"
        isRequired={false}
        isReadOnly={false}
        value={notificationToken}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              status,
              notificationToken: value,
              previousBalance,
              owner,
              googleOwner,
            };
            const result = onChange(modelFields);
            value = result?.notificationToken ?? value;
          }
          if (errors.notificationToken?.hasError) {
            runValidationTasks("notificationToken", value);
          }
          setNotificationToken(value);
        }}
        onBlur={() =>
          runValidationTasks("notificationToken", notificationToken)
        }
        errorMessage={errors.notificationToken?.errorMessage}
        hasError={errors.notificationToken?.hasError}
        {...getOverrideProps(overrides, "notificationToken")}
      ></TextField>
      <TextField
        label="Previous balance"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={previousBalance}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              email,
              status,
              notificationToken,
              previousBalance: value,
              owner,
              googleOwner,
            };
            const result = onChange(modelFields);
            value = result?.previousBalance ?? value;
          }
          if (errors.previousBalance?.hasError) {
            runValidationTasks("previousBalance", value);
          }
          setPreviousBalance(value);
        }}
        onBlur={() => runValidationTasks("previousBalance", previousBalance)}
        errorMessage={errors.previousBalance?.errorMessage}
        hasError={errors.previousBalance?.hasError}
        {...getOverrideProps(overrides, "previousBalance")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              status,
              notificationToken,
              previousBalance,
              owner: value,
              googleOwner,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <TextField
        label="Google owner"
        isRequired={false}
        isReadOnly={false}
        value={googleOwner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              status,
              notificationToken,
              previousBalance,
              owner,
              googleOwner: value,
            };
            const result = onChange(modelFields);
            value = result?.googleOwner ?? value;
          }
          if (errors.googleOwner?.hasError) {
            runValidationTasks("googleOwner", value);
          }
          setGoogleOwner(value);
        }}
        onBlur={() => runValidationTasks("googleOwner", googleOwner)}
        errorMessage={errors.googleOwner?.errorMessage}
        hasError={errors.googleOwner?.hasError}
        {...getOverrideProps(overrides, "googleOwner")}
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
          isDisabled={!(idProp || userModelProp)}
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
              !(idProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
