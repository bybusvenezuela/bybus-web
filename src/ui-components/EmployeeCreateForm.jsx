/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Employee } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function EmployeeCreateForm(props) {
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
    email: "",
    phone: "",
    ping: "",
    type: "",
    permissions: [],
    owner: "",
    lastConnection: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [ping, setPing] = React.useState(initialValues.ping);
  const [type, setType] = React.useState(initialValues.type);
  const [permissions, setPermissions] = React.useState(
    initialValues.permissions
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [lastConnection, setLastConnection] = React.useState(
    initialValues.lastConnection
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setEmail(initialValues.email);
    setPhone(initialValues.phone);
    setPing(initialValues.ping);
    setType(initialValues.type);
    setPermissions(initialValues.permissions);
    setCurrentPermissionsValue("");
    setOwner(initialValues.owner);
    setLastConnection(initialValues.lastConnection);
    setErrors({});
  };
  const [currentPermissionsValue, setCurrentPermissionsValue] =
    React.useState("");
  const permissionsRef = React.createRef();
  const getDisplayValue = {
    permissions: (r) => {
      const enumDisplayValueMap = {
        QRSCAN: "Qrscan",
        BOOOKING_READ: "Boooking read",
        BOOOKING_UPDATED: "Boooking updated",
        BOOOKING_CREATED: "Boooking created",
        BOOOKING_DELETED: "Boooking deleted",
        BALANCE_OFFICE_READ: "Balance office read",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    name: [],
    email: [],
    phone: [],
    ping: [],
    type: [],
    permissions: [],
    owner: [],
    lastConnection: [],
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
          email,
          phone,
          ping,
          type,
          permissions,
          owner,
          lastConnection,
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
          await DataStore.save(new Employee(modelFields));
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
      {...getOverrideProps(overrides, "EmployeeCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              email,
              phone,
              ping,
              type,
              permissions,
              owner,
              lastConnection,
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
              phone,
              ping,
              type,
              permissions,
              owner,
              lastConnection,
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
              name,
              email,
              phone: value,
              ping,
              type,
              permissions,
              owner,
              lastConnection,
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
        label="Ping"
        isRequired={false}
        isReadOnly={false}
        value={ping}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              ping: value,
              type,
              permissions,
              owner,
              lastConnection,
            };
            const result = onChange(modelFields);
            value = result?.ping ?? value;
          }
          if (errors.ping?.hasError) {
            runValidationTasks("ping", value);
          }
          setPing(value);
        }}
        onBlur={() => runValidationTasks("ping", ping)}
        errorMessage={errors.ping?.errorMessage}
        hasError={errors.ping?.hasError}
        {...getOverrideProps(overrides, "ping")}
      ></TextField>
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              ping,
              type: value,
              permissions,
              owner,
              lastConnection,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="Owner"
          value="OWNER"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Office"
          value="OFFICE"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
        <option
          children="Collector"
          value="COLLECTOR"
          {...getOverrideProps(overrides, "typeoption2")}
        ></option>
      </SelectField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              ping,
              type,
              permissions: values,
              owner,
              lastConnection,
            };
            const result = onChange(modelFields);
            values = result?.permissions ?? values;
          }
          setPermissions(values);
          setCurrentPermissionsValue("");
        }}
        currentFieldValue={currentPermissionsValue}
        label={"Permissions"}
        items={permissions}
        hasError={errors?.permissions?.hasError}
        errorMessage={errors?.permissions?.errorMessage}
        getBadgeText={getDisplayValue.permissions}
        setFieldValue={setCurrentPermissionsValue}
        inputFieldRef={permissionsRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Permissions"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentPermissionsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.permissions?.hasError) {
              runValidationTasks("permissions", value);
            }
            setCurrentPermissionsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("permissions", currentPermissionsValue)
          }
          errorMessage={errors.permissions?.errorMessage}
          hasError={errors.permissions?.hasError}
          ref={permissionsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "permissions")}
        >
          <option
            children="Qrscan"
            value="QRSCAN"
            {...getOverrideProps(overrides, "permissionsoption0")}
          ></option>
          <option
            children="Boooking read"
            value="BOOOKING_READ"
            {...getOverrideProps(overrides, "permissionsoption1")}
          ></option>
          <option
            children="Boooking updated"
            value="BOOOKING_UPDATED"
            {...getOverrideProps(overrides, "permissionsoption2")}
          ></option>
          <option
            children="Boooking created"
            value="BOOOKING_CREATED"
            {...getOverrideProps(overrides, "permissionsoption3")}
          ></option>
          <option
            children="Boooking deleted"
            value="BOOOKING_DELETED"
            {...getOverrideProps(overrides, "permissionsoption4")}
          ></option>
          <option
            children="Balance office read"
            value="BALANCE_OFFICE_READ"
            {...getOverrideProps(overrides, "permissionsoption5")}
          ></option>
        </SelectField>
      </ArrayField>
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
              phone,
              ping,
              type,
              permissions,
              owner: value,
              lastConnection,
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
        label="Last connection"
        isRequired={false}
        isReadOnly={false}
        value={lastConnection}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              ping,
              type,
              permissions,
              owner,
              lastConnection: value,
            };
            const result = onChange(modelFields);
            value = result?.lastConnection ?? value;
          }
          if (errors.lastConnection?.hasError) {
            runValidationTasks("lastConnection", value);
          }
          setLastConnection(value);
        }}
        onBlur={() => runValidationTasks("lastConnection", lastConnection)}
        errorMessage={errors.lastConnection?.errorMessage}
        hasError={errors.lastConnection?.hasError}
        {...getOverrideProps(overrides, "lastConnection")}
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