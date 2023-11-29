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
import { getTicket } from "../graphql/queries";
import { updateTicket } from "../graphql/mutations";
const client = generateClient();
export default function TicketUpdateForm(props) {
  const {
    id: idProp,
    ticket: ticketModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    code: "",
    orderDetailID: "",
    stop: "",
    seating: "",
    status: "",
    description: "",
    url: "",
    owner: "",
  };
  const [code, setCode] = React.useState(initialValues.code);
  const [orderDetailID, setOrderDetailID] = React.useState(
    initialValues.orderDetailID
  );
  const [stop, setStop] = React.useState(initialValues.stop);
  const [seating, setSeating] = React.useState(initialValues.seating);
  const [status, setStatus] = React.useState(initialValues.status);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [url, setUrl] = React.useState(initialValues.url);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = ticketRecord
      ? { ...initialValues, ...ticketRecord }
      : initialValues;
    setCode(cleanValues.code);
    setOrderDetailID(cleanValues.orderDetailID);
    setStop(cleanValues.stop);
    setSeating(cleanValues.seating);
    setStatus(cleanValues.status);
    setDescription(cleanValues.description);
    setUrl(cleanValues.url);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [ticketRecord, setTicketRecord] = React.useState(ticketModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTicket.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTicket
        : ticketModelProp;
      setTicketRecord(record);
    };
    queryData();
  }, [idProp, ticketModelProp]);
  React.useEffect(resetStateValues, [ticketRecord]);
  const validations = {
    code: [],
    orderDetailID: [],
    stop: [],
    seating: [],
    status: [],
    description: [],
    url: [],
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
          code: code ?? null,
          orderDetailID: orderDetailID ?? null,
          stop: stop ?? null,
          seating: seating ?? null,
          status: status ?? null,
          description: description ?? null,
          url: url ?? null,
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
            query: updateTicket.replaceAll("__typename", ""),
            variables: {
              input: {
                id: ticketRecord.id,
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
      {...getOverrideProps(overrides, "TicketUpdateForm")}
      {...rest}
    >
      <TextField
        label="Code"
        isRequired={false}
        isReadOnly={false}
        value={code}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code: value,
              orderDetailID,
              stop,
              seating,
              status,
              description,
              url,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.code ?? value;
          }
          if (errors.code?.hasError) {
            runValidationTasks("code", value);
          }
          setCode(value);
        }}
        onBlur={() => runValidationTasks("code", code)}
        errorMessage={errors.code?.errorMessage}
        hasError={errors.code?.hasError}
        {...getOverrideProps(overrides, "code")}
      ></TextField>
      <TextField
        label="Order detail id"
        isRequired={false}
        isReadOnly={false}
        value={orderDetailID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              orderDetailID: value,
              stop,
              seating,
              status,
              description,
              url,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.orderDetailID ?? value;
          }
          if (errors.orderDetailID?.hasError) {
            runValidationTasks("orderDetailID", value);
          }
          setOrderDetailID(value);
        }}
        onBlur={() => runValidationTasks("orderDetailID", orderDetailID)}
        errorMessage={errors.orderDetailID?.errorMessage}
        hasError={errors.orderDetailID?.hasError}
        {...getOverrideProps(overrides, "orderDetailID")}
      ></TextField>
      <TextField
        label="Stop"
        isRequired={false}
        isReadOnly={false}
        value={stop}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              orderDetailID,
              stop: value,
              seating,
              status,
              description,
              url,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.stop ?? value;
          }
          if (errors.stop?.hasError) {
            runValidationTasks("stop", value);
          }
          setStop(value);
        }}
        onBlur={() => runValidationTasks("stop", stop)}
        errorMessage={errors.stop?.errorMessage}
        hasError={errors.stop?.hasError}
        {...getOverrideProps(overrides, "stop")}
      ></TextField>
      <TextField
        label="Seating"
        isRequired={false}
        isReadOnly={false}
        value={seating}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              orderDetailID,
              stop,
              seating: value,
              status,
              description,
              url,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.seating ?? value;
          }
          if (errors.seating?.hasError) {
            runValidationTasks("seating", value);
          }
          setSeating(value);
        }}
        onBlur={() => runValidationTasks("seating", seating)}
        errorMessage={errors.seating?.errorMessage}
        hasError={errors.seating?.hasError}
        {...getOverrideProps(overrides, "seating")}
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
              code,
              orderDetailID,
              stop,
              seating,
              status: value,
              description,
              url,
              owner,
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
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              orderDetailID,
              stop,
              seating,
              status,
              description: value,
              url,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Url"
        isRequired={false}
        isReadOnly={false}
        value={url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              orderDetailID,
              stop,
              seating,
              status,
              description,
              url: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.url ?? value;
          }
          if (errors.url?.hasError) {
            runValidationTasks("url", value);
          }
          setUrl(value);
        }}
        onBlur={() => runValidationTasks("url", url)}
        errorMessage={errors.url?.errorMessage}
        hasError={errors.url?.hasError}
        {...getOverrideProps(overrides, "url")}
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
              code,
              orderDetailID,
              stop,
              seating,
              status,
              description,
              url,
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
          isDisabled={!(idProp || ticketModelProp)}
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
              !(idProp || ticketModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
