import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import styles from "@/styles/Modal.module.css";
// amplify
import { Auth, API } from "aws-amplify";
import * as mutations from "@/graphql/custom/mutations/office";
import { venezuela } from "@/constants";

export default function ModalOfficeEdit({ open, close, data }) {
  useEffect(() => {}, []);

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
                <h2>Tu oficina registrada</h2>
              </div>
              <div className={styles.inputs}>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  disabled
                  defaultValue={data.name}
                />
                <TextField
                  id="outlined-basic"
                  label="Correo Electronico"
                  variant="outlined"
                  disabled
                  defaultValue={data.email}
                />
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Estado"
                    disabled
                    variant="outlined"
                    defaultValue={data.state}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Ciudad"
                    disabled
                    variant="outlined"
                    defaultValue={data.city}
                  />
                </div>
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Direccion"
                    disabled
                    variant="outlined"
                    defaultValue={data.address}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Telefono"
                    disabled
                    variant="outlined"
                    defaultValue={data.phone}
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={close}
              >
                Salir
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
