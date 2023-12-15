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

export default function ModalTransport({ open, close, office }) {
  //   const [office, setOffice] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [serial, setSerial] = useState("");
  const [type, setType] = useState("");

  const onCreateTransport = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const transport = await API.graphql({
      query: mutations.createTransport,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        input: {
          model: model.trim(),
          serial: serial.trim(),
          type: type.trim(),
          officeID: office.id,
        },
      },
    });
  };

  const resetModal = () => {
    setModel("");
    setBrand("");
    setSerial("");
    setType("");
    close();
  };
  useEffect(() => {
  }, []);

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
                <h2>Registrar nuevo transporte</h2>
              </div>
              <div className={styles.inputs}>
                <p>
                  {office?.name} - {office?.state} - {office?.city} -{" "}
                  {office?.address}
                </p>
                {/* <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Oficina</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={office}
                    label="Oficina"
                    onChange={(e) => setOffice(e.target.value)}
                  >
                    {offices?.map((item, index) => (
                      <MenuItem
                        value={item.id}
                        key={index}
                        sx={{
                          textTransform: "uppercase",
                        }}
                      >
                        {item.name} - {item.state} - {item.city} -{" "}
                        {item.address}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Modelo"
                    variant="outlined"
                    value={model}
                    fullWidth
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Nº de Placa"
                    variant="outlined"
                    value={serial}
                    onChange={(e) => setSerial(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Tipo"
                    variant="outlined"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  onCreateTransport();
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
