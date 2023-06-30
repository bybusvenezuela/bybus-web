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
import { Booking } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function BookingUpdateForm(props) {
  const {
    id: idProp,
    booking: bookingModelProp,
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
    agencyID: "",
    officeID: "",
    departureDate: "",
    arrivalDate: "",
    estimatedTime: "",
    departureLoc: "",
    destinationLoc: "",
    service: "",
    owner: "",
    officeOwner: "",
  };
  const [code, setCode] = React.useState(initialValues.code);
  const [agencyID, setAgencyID] = React.useState(initialValues.agencyID);
  const [officeID, setOfficeID] = React.useState(initialValues.officeID);
  const [departureDate, setDepartureDate] = React.useState(
    initialValues.departureDate
  );
  const [arrivalDate, setArrivalDate] = React.useState(
    initialValues.arrivalDate
  );
  const [estimatedTime, setEstimatedTime] = React.useState(
    initialValues.estimatedTime
  );
  const [departureLoc, setDepartureLoc] = React.useState(
    initialValues.departureLoc
  );
  const [destinationLoc, setDestinationLoc] = React.useState(
    initialValues.destinationLoc
  );
  const [service, setService] = React.useState(initialValues.service);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [officeOwner, setOfficeOwner] = React.useState(
    initialValues.officeOwner
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = bookingRecord
      ? { ...initialValues, ...bookingRecord }
      : initialValues;
    setCode(cleanValues.code);
    setAgencyID(cleanValues.agencyID);
    setOfficeID(cleanValues.officeID);
    setDepartureDate(cleanValues.departureDate);
    setArrivalDate(cleanValues.arrivalDate);
    setEstimatedTime(cleanValues.estimatedTime);
    setDepartureLoc(cleanValues.departureLoc);
    setDestinationLoc(cleanValues.destinationLoc);
    setService(cleanValues.service);
    setOwner(cleanValues.owner);
    setOfficeOwner(cleanValues.officeOwner);
    setErrors({});
  };
  const [bookingRecord, setBookingRecord] = React.useState(bookingModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Booking, idProp)
        : bookingModelProp;
      setBookingRecord(record);
    };
    queryData();
  }, [idProp, bookingModelProp]);
  React.useEffect(resetStateValues, [bookingRecord]);
  const validations = {
    code: [],
    agencyID: [{ type: "Required" }],
    officeID: [{ type: "Required" }],
    departureDate: [],
    arrivalDate: [],
    estimatedTime: [],
    departureLoc: [],
    destinationLoc: [],
    service: [],
    owner: [],
    officeOwner: [],
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
          code,
          agencyID,
          officeID,
          departureDate,
          arrivalDate,
          estimatedTime,
          departureLoc,
          destinationLoc,
          service,
          owner,
          officeOwner,
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
            Booking.copyOf(bookingRecord, (updated) => {
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
      {...getOverrideProps(overrides, "BookingUpdateForm")}
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
              agencyID,
              officeID,
              departureDate,
              arrivalDate,
              estimatedTime,
              departureLoc,
              destinationLoc,
              service,
              owner,
              officeOwner,
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
        label="Agency id"
        isRequired={true}
        isReadOnly={false}
        value={agencyID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              agencyID: value,
              officeID,
              departureDate,
              arrivalDate,
              estimatedTime,
              departureLoc,
              destinationLoc,
              service,
              owner,
              officeOwner,
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
      <TextField
        label="Office id"
        isRequired={true}
        isReadOnly={false}
        value={officeID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              agencyID,
              officeID: value,
              departureDate,
              arrivalDate,
              estimatedTime,
              departureLoc,
              destinationLoc,
              service,
              owner,
              officeOwner,
            };
            const result = onChange(modelFields);
            value = result?.officeID ?? value;
          }
          if (errors.officeID?.hasError) {
            runValidationTasks("officeID", value);
          }
          setOfficeID(value);
        }}
        onBlur={() => runValidationTasks("officeID", officeID)}
        errorMessage={errors.officeID?.errorMessage}
        hasError={errors.officeID?.hasError}
        {...getOverrideProps(overrides, "officeID")}
      ></TextField>
      <TextField
        label="Departure date"
        isRequired={false}
        isReadOnly={false}
        value={departureDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              agencyID,
              officeID,
              departureDate: value,
              arrivalDate,
              estimatedTime,
              departureLoc,
              destinationLoc,
              service,
              owner,
              officeOwner,
            };
            const result = onChange(modelFields);
            value = result?.departureDate ?? value;
          }
          if (errors.departureDate?.hasError) {
            runValidationTasks("departureDate", value);
          }
          setDepartureDate(value);
        }}
        onBlur={() => runValidationTasks("departureDate", departureDate)}
        errorMessage={errors.departureDate?.errorMessage}
        hasError={errors.departureDate?.hasError}
        {...getOverrideProps(overrides, "departureDate")}
      ></TextField>
      <TextField
        label="Arrival date"
        isRequired={false}
        isReadOnly={false}
        value={arrivalDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              agencyID,
              officeID,
              departureDate,
              arrivalDate: value,
              estimatedTime,
              departureLoc,
              destinationLoc,
              service,
              owner,
              officeOwner,
            };
            const result = onChange(modelFields);
            value = result?.arrivalDate ?? value;
          }
          if (errors.arrivalDate?.hasError) {
            runValidationTasks("arrivalDate", value);
          }
          setArrivalDate(value);
        }}
        onBlur={() => runValidationTasks("arrivalDate", arrivalDate)}
        errorMessage={errors.arrivalDate?.errorMessage}
        hasError={errors.arrivalDate?.hasError}
        {...getOverrideProps(overrides, "arrivalDate")}
      ></TextField>
      <TextField
        label="Estimated time"
        isRequired={false}
        isReadOnly={false}
        value={estimatedTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              agencyID,
              officeID,
              departureDate,
              arrivalDate,
              estimatedTime: value,
              departureLoc,
              destinationLoc,
              service,
              owner,
              officeOwner,
            };
            const result = onChange(modelFields);
            value = result?.estimatedTime ?? value;
          }
          if (errors.estimatedTime?.hasError) {
            runValidationTasks("estimatedTime", value);
          }
          setEstimatedTime(value);
        }}
        onBlur={() => runValidationTasks("estimatedTime", estimatedTime)}
        errorMessage={errors.estimatedTime?.errorMessage}
        hasError={errors.estimatedTime?.hasError}
        {...getOverrideProps(overrides, "estimatedTime")}
      ></TextField>
      <TextField
        label="Departure loc"
        isRequired={false}
        isReadOnly={false}
        value={departureLoc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              agencyID,
              officeID,
              departureDate,
              arrivalDate,
              estimatedTime,
              departureLoc: value,
              destinationLoc,
              service,
              owner,
              officeOwner,
            };
            const result = onChange(modelFields);
            value = result?.departureLoc ?? value;
          }
          if (errors.departureLoc?.hasError) {
            runValidationTasks("departureLoc", value);
          }
          setDepartureLoc(value);
        }}
        onBlur={() => runValidationTasks("departureLoc", departureLoc)}
        errorMessage={errors.departureLoc?.errorMessage}
        hasError={errors.departureLoc?.hasError}
        {...getOverrideProps(overrides, "departureLoc")}
      ></TextField>
      <TextField
        label="Destination loc"
        isRequired={false}
        isReadOnly={false}
        value={destinationLoc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              agencyID,
              officeID,
              departureDate,
              arrivalDate,
              estimatedTime,
              departureLoc,
              destinationLoc: value,
              service,
              owner,
              officeOwner,
            };
            const result = onChange(modelFields);
            value = result?.destinationLoc ?? value;
          }
          if (errors.destinationLoc?.hasError) {
            runValidationTasks("destinationLoc", value);
          }
          setDestinationLoc(value);
        }}
        onBlur={() => runValidationTasks("destinationLoc", destinationLoc)}
        errorMessage={errors.destinationLoc?.errorMessage}
        hasError={errors.destinationLoc?.hasError}
        {...getOverrideProps(overrides, "destinationLoc")}
      ></TextField>
      <SelectField
        label="Service"
        placeholder="Please select an option"
        isDisabled={false}
        value={service}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              agencyID,
              officeID,
              departureDate,
              arrivalDate,
              estimatedTime,
              departureLoc,
              destinationLoc,
              service: value,
              owner,
              officeOwner,
            };
            const result = onChange(modelFields);
            value = result?.service ?? value;
          }
          if (errors.service?.hasError) {
            runValidationTasks("service", value);
          }
          setService(value);
        }}
        onBlur={() => runValidationTasks("service", service)}
        errorMessage={errors.service?.errorMessage}
        hasError={errors.service?.hasError}
        {...getOverrideProps(overrides, "service")}
      >
        <option
          children="Groud"
          value="GROUD"
          {...getOverrideProps(overrides, "serviceoption0")}
        ></option>
      </SelectField>
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
              agencyID,
              officeID,
              departureDate,
              arrivalDate,
              estimatedTime,
              departureLoc,
              destinationLoc,
              service,
              owner: value,
              officeOwner,
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
        label="Office owner"
        isRequired={false}
        isReadOnly={false}
        value={officeOwner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              agencyID,
              officeID,
              departureDate,
              arrivalDate,
              estimatedTime,
              departureLoc,
              destinationLoc,
              service,
              owner,
              officeOwner: value,
            };
            const result = onChange(modelFields);
            value = result?.officeOwner ?? value;
          }
          if (errors.officeOwner?.hasError) {
            runValidationTasks("officeOwner", value);
          }
          setOfficeOwner(value);
        }}
        onBlur={() => runValidationTasks("officeOwner", officeOwner)}
        errorMessage={errors.officeOwner?.errorMessage}
        hasError={errors.officeOwner?.hasError}
        {...getOverrideProps(overrides, "officeOwner")}
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
          isDisabled={!(idProp || bookingModelProp)}
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
              !(idProp || bookingModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
