import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import styles from "@/styles/Modal.module.css";
// amplify
import { Auth, API } from "aws-amplify";
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
import { venezuela } from "@/constants";

export default function ModalOffice({ open, close }) {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const onCreateOffice = async () => {
    const office = await API.graphql({
      query: mutations.createOffice,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        input: {
          state: state,
          city: city,
          address: address,
          phone: phone,
        },
      },
    });
  };
  useEffect(() => {
    console.log({
      name: name,
      state: state,
      city: city,
      phone: phone,
      address: address,
    });
  }, [phone]);

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
                <h2>Registrar nueva oficina</h2>
              </div>
              <div className={styles.inputs}>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className={styles.input}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Estado
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={state}
                      label="Estado"
                      onChange={(e) => setState(e.target.value)}
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
                      value={city}
                      label="Ciudad"
                      onChange={(e) => setCity(e.target.value)}
                    >
                      {venezuela.map((item, index) =>
                        state === item.estado
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
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
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
