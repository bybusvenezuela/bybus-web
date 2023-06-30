/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Wallet } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function WalletUpdateForm(props) {
  const {
    id: idProp,
    wallet: walletModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    userID: "",
    email: "",
    status: "",
    notificationToken: "",
    previousBalance: "",
    owner: "",
    googleOwner: "",
  };
  const [userID, setUserID] = React.useState(initialValues.userID);
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
    const cleanValues = walletRecord
      ? { ...initialValues, ...walletRecord }
      : initialValues;
    setUserID(cleanValues.userID);
    setEmail(cleanValues.email);
    setStatus(cleanValues.status);
    setNotificationToken(cleanValues.notificationToken);
    setPreviousBalance(cleanValues.previousBalance);
    setOwner(cleanValues.owner);
    setGoogleOwner(cleanValues.googleOwner);
    setErrors({});
  };
  const [walletRecord, setWalletRecord] = React.useState(walletModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Wallet, idProp)
        : walletModelProp;
      setWalletRecord(record);
    };
    queryData();
  }, [idProp, walletModelProp]);
  React.useEffect(resetStateValues, [walletRecord]);
  const validations = {
    userID: [{ type: "Required" }],
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
          userID,
          email,
          status,
          notificationToken,
          previousBalance,
          owner,
          googleOwner,
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
          await DataStore.save(
            Wallet.copyOf(walletRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "WalletUpdateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={true}
        isReadOnly={false}
        value={userID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userID: value,
              email,
              status,
              notificationToken,
              previousBalance,
              owner,
              googleOwner,
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
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userID,
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
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userID,
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
      ></TextField>
      <TextField
        label="Notification token"
        isRequired={false}
        isReadOnly={false}
        value={notificationToken}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userID,
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
              userID,
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
              userID,
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
              userID,
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
          isDisabled={!(idProp || walletModelProp)}
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
              !(idProp || walletModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
