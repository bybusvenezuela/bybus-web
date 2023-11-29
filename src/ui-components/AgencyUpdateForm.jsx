/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getAgency } from "../graphql/queries";
import { updateAgency } from "../graphql/mutations";
const client = generateClient();
export default function AgencyUpdateForm(props) {
  const {
    id: idProp,
    agency: agencyModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    cognitoID: "",
    pin: "",
    name: "",
    rif: "",
    email: "",
    phone: "",
    owner: "",
  };
  const [cognitoID, setCognitoID] = React.useState(initialValues.cognitoID);
  const [pin, setPin] = React.useState(initialValues.pin);
  const [name, setName] = React.useState(initialValues.name);
  const [rif, setRif] = React.useState(initialValues.rif);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = agencyRecord
      ? { ...initialValues, ...agencyRecord }
      : initialValues;
    setCognitoID(cleanValues.cognitoID);
    setPin(cleanValues.pin);
    setName(cleanValues.name);
    setRif(cleanValues.rif);
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [agencyRecord, setAgencyRecord] = React.useState(agencyModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getAgency.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getAgency
        : agencyModelProp;
      setAgencyRecord(record);
    };
    queryData();
  }, [idProp, agencyModelProp]);
  React.useEffect(resetStateValues, [agencyRecord]);
  const validations = {
    cognitoID: [],
    pin: [],
    name: [],
    rif: [],
    email: [],
    phone: [],
    owner: [],
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
          cognitoID: cognitoID ?? null,
          pin: pin ?? null,
          name: name ?? null,
          rif: rif ?? null,
          email: email ?? null,
          phone: phone ?? null,
          owner: owner ?? null,
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
            query: updateAgency.replaceAll("__typename", ""),
            variables: {
              input: {
                id: agencyRecord.id,
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
      {...getOverrideProps(overrides, "AgencyUpdateForm")}
      {...rest}
    >
      <TextField
        label="Cognito id"
        isRequired={false}
        isReadOnly={false}
        value={cognitoID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoID: value,
              pin,
              name,
              rif,
              email,
              phone,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.cognitoID ?? value;
          }
          if (errors.cognitoID?.hasError) {
            runValidationTasks("cognitoID", value);
          }
          setCognitoID(value);
        }}
        onBlur={() => runValidationTasks("cognitoID", cognitoID)}
        errorMessage={errors.cognitoID?.errorMessage}
        hasError={errors.cognitoID?.hasError}
        {...getOverrideProps(overrides, "cognitoID")}
      ></TextField>
      <TextField
        label="Pin"
        isRequired={false}
        isReadOnly={false}
        value={pin}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoID,
              pin: value,
              name,
              rif,
              email,
              phone,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.pin ?? value;
          }
          if (errors.pin?.hasError) {
            runValidationTasks("pin", value);
          }
          setPin(value);
        }}
        onBlur={() => runValidationTasks("pin", pin)}
        errorMessage={errors.pin?.errorMessage}
        hasError={errors.pin?.hasError}
        {...getOverrideProps(overrides, "pin")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoID,
              pin,
              name: value,
              rif,
              email,
              phone,
              owner,
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
        isRequired={false}
        isReadOnly={false}
        value={rif}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoID,
              pin,
              name,
              rif: value,
              email,
              phone,
              owner,
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
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoID,
              pin,
              name,
              rif,
              email: value,
              phone,
              owner,
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
        isRequired={false}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoID,
              pin,
              name,
              rif,
              email,
              phone: value,
              owner,
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
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoID,
              pin,
              name,
              rif,
              email,
              phone,
              owner: value,
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
          isDisabled={!(idProp || agencyModelProp)}
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
              !(idProp || agencyModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
