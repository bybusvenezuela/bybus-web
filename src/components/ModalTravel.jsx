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
  const [number, setNumber] = useState(1);
  const [stopQ, setStopQ] = useState([]);
  const [transport, setTransport] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
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
  const resetModal = () => {
    setStopQ([]);
    setDeparture({
      ...departure,
      city: offices.city,
      address: offices.address,
      state: offices.state,
    });
    setArrival({
      state: "",
      city: "",
      date: "",
      time: "",
      address: "",
    });
    setTransport("");
    setPrice("");
    setQuantity("");
    close();
  };

  const onCreateTravel = async () => {
    const rif = await API.graphql({
      query: queries.getAgency,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        userID: offices.agencyID,
      },
    });
    const listCodeBookings = await API.graphql({
      query: queries.listBookings,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    const generateCode = () => {
      let codeBooking = `${rif.data.getAgency.rif.replace(
        "-",
        ""
      )}${offices.state.slice(0, 3)}${offices.city.slice(
        0,
        3
      )}${departure.date.replaceAll("-", "")}${number
        .toString()
        .padStart(2, "0")}`;
      return codeBooking;
    };
    const verifyCode = async (code) => {
      let codeVerify = null;
      let i = 0;
      while (i < listCodeBookings.data.listBookings.items.length) {
        i++;
        let element = listCodeBookings.data.listBookings.items[i]?.code;
        element === code ? setNumber(number + 1) : (codeVerify = code);
      }
      return codeVerify;
    };

    const codeTravel = generateCode(number);
    const verifyCodeTravel = await verifyCode(codeTravel.toUpperCase());
    console.log(verifyCodeTravel)
    const booking = await API.graphql({
      query: mutations.createBooking,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        input: {
          agencyID: offices.agencyID,
          officeID: offices.id,
          transport: transport,
          code: verifyCodeTravel,
          departure: {
            time: departure.time,
            date: departure.date,
            city: departure.city,
            state: departure.state,
            address: departure.address.trim(),
          },
          arrival: {
            time: arrival.time,
            date: arrival.date,
            city: arrival.city,
            state: arrival.state,
            address: arrival.address.trim(),
          },
          departureCity: departure.city,
          arrivalCity: arrival.city,
          stock: quantity.trim(),
          price: price.trim(),
        },
      },
    });
    console.log(booking)
    
    for (let i = 1; i <= booking.data.createBooking.stock; i++) {
      const ticket = await API.graphql({
        query: mutations.createTicket,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: {
            code: `${booking.data.createBooking.code}-${i
              .toString()
              .padStart(2, "0")}-${booking.data.createBooking.id.slice(0, 5)}`,
            bookingID: booking.data.createBooking.id,
            status: "Active",
          },
        },
      });
    }

    if (stopQ.length !== 0) {
      for (let i = 0; i + 1 <= stopQ.length; i++) {
        const stop = await API.graphql({
          query: mutations.createStopBooking,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: {
                bookingID: booking.data.createBooking.id,
                arrival: {
                  time: stopQ[i]?.time,
                  date: stopQ[i]?.date,
                  city: stopQ[i]?.city,
                  state: stopQ[i]?.state,
                  address: stopQ[i]?.address.trim(),
                },
                price: stopQ[i]?.price.trim(),
            },
          },
        });
        for (let i = 1; i <= booking.data.createBooking.stock; i++) {
          const ticketStop = await API.graphql({
            query: mutations.createTicket,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              input: {
                stop: stop.data.createStopBooking.id,
                code: `${booking.data.createBooking.code}-${i
                  .toString()
                  .padStart(2, "0")}-${stop.data.createStopBooking.id.slice(0, 5)}`,
                bookingID: booking.data.createBooking.id,
                status: "Active",
              },
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    setDeparture({
      ...departure,
      city: offices.city,
      address: offices.address,
      state: offices.state,
    });
    // console.log(offices);
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
                        value={departure.address}
                        disabled
                      />
                      <div className={styles.datetime}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <div className={styles.date}>
                            <DatePicker
                              onChange={(e) => {
                                let fecha = new Date(e)
                                  .toISOString()
                                  .slice(0, 10);
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
                                let fecha = new Date(e)
                                  .toISOString()
                                  .slice(0, 10);
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
                  <p>Tickets</p>
                  <div className={styles.inputTravel}>
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
                        {offices?.transports?.items?.map((item, index) => (
                          <MenuItem value={item?.id} key={index}>
                            {item?.model} - {item?.serial} - {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      id="outlined-basic"
                      label="Precio"
                      variant="outlined"
                      onChange={(e) => setPrice(e.target.value)}
                      sx={{ width: 170 }}
                    />
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      label="Cantidad de puestos"
                      onChange={(e) => setQuantity(e.target.value)}
                      sx={{ width: 450 }}
                    />
                  </div>
                  <p>Paradas</p>
                  <div className={styles.stop}>
                    <div className={styles.stopBooking}>
                      {stopQ && (
                        <div className={styles.stopForm}>
                          {stopQ.map((item, index) => (
                            <div className={styles.stopContent} key={index}>
                              <div className={styles.inputTravel}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Estado
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    value={item.state}
                                    label="Estado"
                                    onChange={(e) => {
                                      const updateStop = stopQ.map(
                                        (stop, stopIndex) => {
                                          if (index === stopIndex) {
                                            return {
                                              ...stop,
                                              state: e.target.value,
                                            };
                                          }
                                          return stop;
                                        }
                                      );
                                      setStopQ(updateStop);
                                    }}
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
                                    value={item.city}
                                    label="Ciudad"
                                    onChange={(e) => {
                                      const updateStop = stopQ.map(
                                        (stop, stopIndex) => {
                                          if (index === stopIndex) {
                                            return {
                                              ...stop,
                                              city: e.target.value,
                                            };
                                          }
                                          return stop;
                                        }
                                      );
                                      setStopQ(updateStop);
                                    }}
                                  >
                                    {venezuela.map((group, index) =>
                                      item.state === group.estado
                                        ? group.ciudades.map((city, index) => (
                                            <MenuItem value={city} key={index}>
                                              {city}
                                            </MenuItem>
                                          ))
                                        : ""
                                    )}
                                  </Select>
                                </FormControl>

                                <div className={styles.datetime}>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <div className={styles.dateStop}>
                                      <DatePicker
                                        onChange={(e) => {
                                          const options = {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                          };
                                          let fecha = new Date(e)
                                            .toISOString()
                                            .slice(0, 10);
                                          const updateStop = stopQ.map(
                                            (stop, stopIndex) => {
                                              if (index === stopIndex) {
                                                return {
                                                  ...stop,
                                                  date: fecha,
                                                };
                                              }
                                              return stop;
                                            }
                                          );
                                          setStopQ(updateStop);
                                        }}
                                      />
                                    </div>
                                    <div className={styles.timeStop}>
                                      <MobileTimePicker
                                        defaultValue={dayjs("2022-04-17T15:30")}
                                        onChange={(e) => {
                                          const options = {
                                            hour12: false,
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            fractionalSecondDigits: 3,
                                          };
                                          let time = new Date(
                                            e
                                          ).toLocaleTimeString("en", options);
                                          const updateStop = stopQ.map(
                                            (stop, stopIndex) => {
                                              if (index === stopIndex) {
                                                return {
                                                  ...stop,
                                                  time: time,
                                                };
                                              }
                                              return stop;
                                            }
                                          );
                                          setStopQ(updateStop);
                                        }}
                                      />
                                    </div>
                                  </LocalizationProvider>
                                </div>
                              </div>
                              <div className={styles.inputTravelOther}>
                                <TextField
                                  id="outlined-basic"
                                  label="Direccion"
                                  variant="outlined"
                                  onChange={(e) => {
                                    const updateStop = stopQ.map(
                                      (stop, stopIndex) => {
                                        if (index === stopIndex) {
                                          return {
                                            ...stop,
                                            address: e.target.value,
                                          };
                                        }
                                        return stop;
                                      }
                                    );
                                    setStopQ(updateStop);
                                  }}
                                  sx={{
                                    width: 560,
                                  }}
                                />
                                <TextField
                                  id="outlined-basic"
                                  label="Precio del ticket de la parada"
                                  variant="outlined"
                                  onChange={(e) => {
                                    const updateStop = stopQ.map(
                                      (stop, stopIndex) => {
                                        if (index === stopIndex) {
                                          return {
                                            ...stop,
                                            price: e.target.value,
                                          };
                                        }
                                        return stop;
                                      }
                                    );
                                    setStopQ(updateStop);
                                  }}
                                  sx={{
                                    width: 315,
                                  }}
                                />
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
                      onClick={() =>
                        setStopQ([
                          ...stopQ,
                          {
                            state: "",
                            city: "",
                            time: "",
                            date: "",
                            address: "",
                            price: "",
                          },
                        ])
                      }
                    >
                      Agregar una parada
                    </Button>
                  </div>
                </div>
              </div>

              <div className={styles.buttons}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    onCreateTravel();
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
