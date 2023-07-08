import React, { useEffect, useLayoutEffect } from "react";
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
import { venezuela } from "@/constants";
import { Auth, API } from "aws-amplify";
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";

export default function ModalTravel({ open, close, offices }) {
  const [stopQ, setStopQ] = useState([]);
  const [stopParams, setStopParams] = useState([]);
  const [transport, setTransport] = useState("");
  const [data, setData] = useState([]);
  const [departure, setDeparture] = useState({
    city: "",
    state: "",
    address: "",
    date: "",
    time: "",
  });
  const [arrival, setArrival] = useState({
    state: "",
    city: "",
    date: "",
    time: "",
    address: "",
  });
  const Office = async () => {
    const list = await API.graphql({
      query: queries.getOffice,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: offices.id,
      },
    });
    setData(list.data.getOffice);
    setDeparture({
      ...departure,
      city: list.data.getOffice.city,
      address: list.data.getOffice.address,
      state: list.data.getOffice.state,
    });
  };

  const resetModal = () => {
    setStopQ([]);
    setDeparture({
      state: "",
      city: "",
      date: "",
      time: "",
      address: "",
    });
    setArrival({
      state: "",
      city: "",
      date: "",
      time: "",
      address: "",
    });
    close();
  };
  useEffect(() => {
    Office();
  }, []);

  if (offices)
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
                            label="Estado"
                            value={departure.state}
                            disabled
                          >
                            {venezuela.map((item, index) => (
                              <MenuItem value={item.estado} key={index}>
                                {item.estado}
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
                            label="Ciudad"
                            value={departure.city}
                            disabled
                          >
                            {venezuela.map((item, index) =>
                              departure.state === item.estado
                                ? item.ciudades.map((city, index) => (
                                    <MenuItem value={city} key={index}>
                                      {city}
                                    </MenuItem>
                                  ))
                                : ""
                            )}
                          </Select>
                        </FormControl>
                      </div>
                      <TextField
                        id="outlined-basic"
                        label="Direccion"
                        variant="outlined"
                        value={departure.address ? departure.address : ""}
                        disabled
                      />
                      <div className={styles.datetime}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <div className={styles.date}>
                            <DatePicker
                              onChange={(e) => {
                                const options = {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                };
                                let fecha = new Date(e).toLocaleDateString(
                                  "zh-Hans-CN",
                                  options
                                );
                                setDeparture({ ...departure, date: fecha });
                              }}
                            />
                          </div>
                          <div className={styles.time}>
                            <MobileTimePicker
                              defaultValue={dayjs("2022-04-17T15:30")}
                              onChange={(e) => {
                                const options = {
                                  hour12: false,
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  fractionalSecondDigits: 3,
                                };
                                let time = new Date(e).toLocaleTimeString(
                                  "en",
                                  options
                                );
                                setDeparture({ ...departure, time: time });
                              }}
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
                            value={arrival.state}
                            label="Ciudad"
                            onChange={(e) =>
                              setArrival({ ...arrival, state: e.target.value })
                            }
                          >
                            {venezuela.map((item, index) => (
                              <MenuItem value={item.estado} key={index}>
                                {item.estado}
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
                            value={arrival.city}
                            label="Ciudad"
                            onChange={(e) =>
                              setArrival({ ...arrival, city: e.target.value })
                            }
                          >
                            {venezuela.map((item, index) =>
                              arrival.state === item.estado
                                ? item.ciudades.map((city, index) => (
                                    <MenuItem value={city} key={index}>
                                      {city}
                                    </MenuItem>
                                  ))
                                : ""
                            )}
                          </Select>
                        </FormControl>
                      </div>
                      <TextField
                        id="outlined-basic"
                        label="Direccion"
                        variant="outlined"
                        onChange={(e) =>
                          setArrival({ ...arrival, address: e.target.value })
                        }
                      />
                      <div className={styles.datetime}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <div className={styles.date}>
                            <DatePicker
                              onChange={(e) => {
                                const options = {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                };
                                let fecha = new Date(e).toLocaleDateString(
                                  "zh-Hans-CN",
                                  options
                                );
                                setArrival({ ...arrival, date: fecha });
                              }}
                            />
                          </div>
                          <div className={styles.time}>
                            <MobileTimePicker
                              defaultValue={dayjs("2022-04-17T15:30")}
                              onChange={(e) => {
                                const options = {
                                  hour12: false,
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  fractionalSecondDigits: 3,
                                };
                                let time = new Date(e).toLocaleTimeString(
                                  "en",
                                  options
                                );
                                setArrival({ ...arrival, time: time });
                              }}
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
                        value={transport}
                        label="Transporte"
                        onChange={(e) => setTransport(e.target.value)}
                      >
                        {offices.transports.items.map((item, index) => (
                          <MenuItem value={item.id} key={index}>
                            {item.model} - {item.serial} - {item.type}
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
                  {/* <div className={styles.stop}>
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
                                  onChange={(e) =>
                                    setCityArrival(e.target.value)
                                  }
                                >
                                  {venezuela.map((item, index) =>
                                    stateArrival === item.estado
                                      ? item.ciudades.map((city, index) => (
                                          <MenuItem value={city} key={index}>
                                            {city}
                                          </MenuItem>
                                        ))
                                      : ""
                                  )}
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
                </div> */}
                </div>
              </div>

              <div className={styles.buttons}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    resetModal();
                  }}
                >
                  Registrar
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={resetModal}
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
