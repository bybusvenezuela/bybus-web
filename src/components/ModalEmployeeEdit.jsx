import React, { useEffect, useState } from "react";
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
import styles from "@/styles/Modal.module.css";
import { Auth, API } from "aws-amplify";
import * as mutations from "@/graphql/custom/mutations/employee";

export default function ModalEmployeeEdit({ open, close, data }) {
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
                <h2>Tu empleado registrado</h2>
              </div>
              <div className={styles.inputs}>
                <TextField
                  id="outlined-basic"
                  label="Oficina"
                  variant="outlined"
                  disabled
                  defaultValue={data?.office?.name}
                />
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    disabled
                    defaultValue={data?.name}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Tipo"
                    variant="outlined"
                    disabled
                    defaultValue={
                      data?.type === "OFFICE" ? "OFICINISTA" : "COBRADOR"
                    }
                  />
                </div>

                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Telefono"
                    variant="outlined"
                    disabled
                    defaultValue={data?.phone}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Correo Electronico"
                    variant="outlined"
                    disabled
                    defaultValue={data?.email}
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
