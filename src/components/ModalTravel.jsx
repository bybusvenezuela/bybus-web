import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "@/styles/Modal.module.css";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';

export default function ModalTravel({ open, close }) {
  const [agency, setAgency] = useState("");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");

  const handleAgency = (event) => {
    setAgency(event.target.value);
  };
  const handleDeparture = (event) => {
    setDeparture(event.target.value);
  };
  const handleDestination = (event) => {
    setDestination(event.target.value);
  };
  const agencies = [
    { agency: "Agencia Generica C.A", value: 1 },
    { agency: "Agencia Generica C.A", value: 2 },
    { agency: "Agencia Generica C.A", value: 3 },
    { agency: "Agencia Generica C.A", value: 4 },
    { agency: "Agencia Generica C.A", value: 5 },
    { agency: "Agencia Generica C.A", value: 6 },
    { agency: "Agencia Generica C.A", value: 7 },
  ];

  const departures = [
    { departure: "Terminal de Guanare", value: 1 },
    { departure: "Terminal de Guanare", value: 2 },
    { departure: "Terminal de Guanare", value: 3 },
    { departure: "Terminal de Guanare", value: 4 },
    { departure: "Terminal de Guanare", value: 5 },
    { departure: "Terminal de Guanare", value: 6 },
    { departure: "Terminal de Guanare", value: 7 },
  ];

  const destinations = [
    { detination: "Terminal de Barquisimeto", value: 1 },
    { detination: "Terminal de Barquisimeto", value: 2 },
    { detination: "Terminal de Barquisimeto", value: 3 },
    { detination: "Terminal de Barquisimeto", value: 4 },
    { detination: "Terminal de Barquisimeto", value: 5 },
    { detination: "Terminal de Barquisimeto", value: 6 },
    { detination: "Terminal de Barquisimeto", value: 7 },
  ];

  
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.title}>
                <h2>Register a new travel</h2>
              </div>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Oficina
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={agency}
                      label="Agency"
                      onChange={handleAgency}
                    >
                      {agencies.map((item) => (
                        <MenuItem value={item.value}>{item.agency}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={styles.input}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Departure
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={departure}
                      label="Departure"
                      onChange={handleDeparture}
                    >
                      {departures.map((item) => (
                        <MenuItem value={item.value}>{item.departure}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Destination
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={destination}
                      label="Destination"
                      onChange={handleDestination}
                    >
                      {destinations.map((item) => (
                        <MenuItem value={item.value}>
                          {item.detination}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={styles.datetime}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className={styles.date}>
                      <DatePicker />
                    </div>
                    <div className={styles.time}>
                      <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                    </div>
                  </LocalizationProvider>
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <Button variant="contained" size="large">
                Register
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={close}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
