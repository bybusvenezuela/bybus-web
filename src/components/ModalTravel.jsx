import React, { useEffect } from "react";
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
import dayjs from "dayjs";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function ModalTravel({ open, close }) {
  const [agency, setAgency] = useState("");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [stopQ, setStopQ] = useState([]);

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
  useEffect(() => {
    console.log(stopQ);
  }, [stopQ]);

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal}>
          <div className={styles.contentTravel}>
            <div className={styles.top}>
              <div className={styles.title}>
                <h2>Registrar nuevo viaje</h2>
              </div>
              <div className={styles.inputs}>
                <div className={styles.travel}>
                  <div className={styles.departure}>
                    <p>Salida</p>
                    <div className={styles.form}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Estado
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          value={departure}
                          label="Departure"
                          onChange={handleDeparture}
                        >
                          {departures.map((item, index) => (
                            <MenuItem value={item.value} key={index}>
                              {item.departure}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Ciudad
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          value={agency}
                          label="Agency"
                          onChange={handleAgency}
                        >
                          {agencies.map((item, index) => (
                            <MenuItem value={item.value} key={index}>
                              {item.agency}
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
                          <MobileTimePicker
                            defaultValue={dayjs("2022-04-17T15:30")}
                          />
                        </div>
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div className={styles.arrival}>
                    <p>Llegada</p>
                    <div className={styles.form}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Estado
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          value={agency}
                          label="Agency"
                          onChange={handleAgency}
                        >
                          {agencies.map((item, index) => (
                            <MenuItem value={item.value} key={index}>
                              {item.agency}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Ciudad
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          value={agency}
                          label="Agency"
                          onChange={handleAgency}
                        >
                          {agencies.map((item, index) => (
                            <MenuItem value={item.value} key={index}>
                              {item.agency}
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
                          <MobileTimePicker
                            defaultValue={dayjs("2022-04-17T15:30")}
                          />
                        </div>
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.input}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Transporte
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={departure}
                      label="Departure"
                      onChange={handleDeparture}
                    >
                      {departures.map((item, index) => (
                        <MenuItem value={item.value} key={index}>
                          {item.departure}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Precio"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Cantidad"
                    variant="outlined"
                  />
                </div>
                <div className={styles.line}></div>
                <div className={styles.stop}>
                  <div className={styles.stopBooking}>
                    {stopQ && (
                      <div className={styles.stopForm}>
                        {stopQ.map((item, index) => (
                          <div className={styles.stopContent} key={index}>
                            <div className={styles.input}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Estado
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  value={departure}
                                  label="Departure"
                                  onChange={handleDeparture}
                                >
                                  {departures.map((item, index) => (
                                    <MenuItem value={item.value} key={index}>
                                      {item.departure}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Ciudad
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  value={agency}
                                  label="Agency"
                                  onChange={handleAgency}
                                >
                                  {agencies.map((item, index) => (
                                    <MenuItem value={item.value} key={index}>
                                      {item.agency}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <div className={styles.datetime}>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <div className={styles.dateStop}>
                                    <DatePicker />
                                  </div>
                                  <div className={styles.timeStop}>
                                    <MobileTimePicker
                                      defaultValue={dayjs("2022-04-17T15:30")}
                                    />
                                  </div>
                                </LocalizationProvider>
                              </div>
                            </div>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<AddRoundedIcon />}
                              onClick={() =>
                                setStopQ((e) => {
                                  let nuevoArreglo = [...e];
                                  nuevoArreglo.splice(index, 1);
                                  return nuevoArreglo;
                                })
                              }
                              className={styles.deleteStop}
                            >
                              Eliminar
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="contained"
                    size="medium"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => setStopQ([...stopQ, 1])}
                  >
                    Agregar una parada
                  </Button>
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <Button variant="contained" size="large">
                Registrar
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={close}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
