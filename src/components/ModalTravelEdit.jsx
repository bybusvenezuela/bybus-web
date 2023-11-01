import React, { useEffect, useLayoutEffect } from "react";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import styles from "@/styles/ModalEdit.module.css";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { time, transportes, venezuela, week } from "@/constants";
import { Auth, API } from "aws-amplify";
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";

export default function ModalTravelEdit({ data, open, close }) {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(data.price);
  const [edit, setEdit] = useState(false);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  //

  useEffect(() => {
    console.log(price);
  }, [edit]);

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
                <h2>Vista previa del Viaje</h2>
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
                          defaultValue={data?.departure?.state}
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
                          defaultValue={data?.departure?.city}
                          disabled
                        >
                          {venezuela.map((item, index) =>
                            data?.departure?.state === item.estado
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
                      value={data?.departure?.address}
                      disabled
                    />
                    <div className={styles.datetime}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className={styles.date}>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Fecha de salida"
                            defaultValue={data?.departure?.date}
                            disabled
                          />
                        </div>
                        <div className={styles.time}>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Tiempo de salida"
                            defaultValue={data?.departure?.time}
                            disabled
                          />
                          {/* <FormControl className={styles.timeInput}>
                            <InputLabel id="demo-simple-select-label">
                              Tiempo de salida
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              label="Tiempo de salida"
                              // defaultValue="00:00"e
                              disabled
                              defaultValue={data?.departure?.time}
                              // onChange={(e) =>
                              //   setTimeDeparture({
                              //     ...timeDeparture,
                              //     hour: e.target.value,
                              //   })
                            >
                              {time.hour.map((item, index) => (
                                <MenuItem value={item.value} key={index}>
                                  {item.text}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl> */}
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
                          defaultValue={data?.arrival?.state}
                          label="Ciudad"
                          disabled
                          // onChange={(e) =>
                          //   setArrival({ ...arrival, state: e.target.value })
                          // }
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
                          defaultValue={data?.arrival?.city}
                          label="Ciudad"
                          disabled
                          // onChange={(e) =>
                          //   setArrival({ ...arrival, city: e.target.value })
                          // }
                        >
                          {venezuela.map((item, index) =>
                            data?.arrival?.state === item.estado
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
                      value={data?.arrival?.address}
                      disabled
                      // onChange={(e) =>
                      //   setArrival({ ...arrival, address: e.target.value })
                      // }
                    />
                    <div className={styles.datetime}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className={styles.date}>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Fecha de llegada"
                            defaultValue={data?.arrival?.date}
                            disabled
                          />
                        </div>
                        <div className={styles.time}>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Tiempo de llegada"
                            defaultValue={data?.arrival?.time}
                            disabled
                          />
                          {/* <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Tiempo de llegada
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                label="Tiempo de llegada"
                                defaultValue={data?.arrival?.time}
                                disabled
                                // onChange={(e) =>
                                //   setTimeArrival({
                                //     ...timeArrival,
                                //     hour: e.target.value,
                                //   })
                              >
                                {time.hour.map((item, index) => (
                                  <MenuItem value={item.value} key={index}>
                                    {item.text}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl> */}
                        </div>
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>
                <p>Tickets</p>
                <div className={styles.inputTravel}>
                  <TextField
                    id="outlined-basic"
                    label="Conductor"
                    variant="outlined"
                    value={data?.driver}
                    disabled
                    sx={{ width: 450 }}
                  />
                  <FormControl sx={{ width: 250 }}>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de transporte
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      defaultValue={data?.transport}
                      label="Tipo de transporte"
                      disabled
                      // onChange={(e) => setTransport(e.target.value)}
                    >
                      {transportes.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Precio"
                    variant="outlined"
                    defaultValue={price ? price : data?.price}
                    disabled
                    onChange={(e) => setPrice(e.target.value)}
                    sx={{ width: 250 }}
                  />
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Cantidad de puestos"
                    disabled
                    value={data?.stock}
                    //   onChange={(e) => setQuantity(e.target.value)}
                    sx={{ width: 250 }}
                  />
                </div>
                {/* <p>Paradas</p> */}
                {/* <div className={styles.stop}>
                  <div className={styles.stopBooking}>
                    {data?.stops?.items?.length !== 0 && (
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
                      <div>Hey</div>
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
                </div> */}
              </div>
            </div>

            <div className={styles.buttons}>
              <div className={styles.control}>
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={() => {
                    close();
                    setPrice(data?.price);
                  }}
                >
                  Salir
                </Button>
              </div>
              {/* <div className={styles.check}>
                  <div className={styles.pan}>
                    Quieres programar este viaje de manera automatica?
                    <Checkbox
                    onChange={(e) => setChecked(!checked)}
                      sx={{
                        color: "#8F877F",
                        "&.Mui-checked": {
                          color: "#0077B6",
                        },
                      }}
                    />
                  </div>

                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Dias a programar
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={selectWeek}
                      onChange={handleChange}
                      input={<OutlinedInput label="Dias a programar" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                      disabled={checked}
                    >
                      {week.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          <Checkbox checked={selectWeek.indexOf(item) > -1} />
                          <ListItemText primary={item} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div> */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
