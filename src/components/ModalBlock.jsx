import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Button, TextField, CircularProgress } from "@mui/material";
import styles from "@/styles/Modal.module.css";
import { API, Auth } from "aws-amplify";
import {
  createAgency,
  registerAgencyAdmin,
  updateAgency,
  updateAgencyCognito,
} from "@/graphql/mutations";

export default function ModalBlock({ open, close, data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [description, setDescription] = useState("");
  console.log("aqui", data);
  const reset = () => {
    setDescription("");
    setMotivo("");
    setIsLoading(false);
    close();
  };

  const onHandleRegister = async () => {
    const params = {
      reason: motivo,
      description: description,
      agencyID: data?.id,
      status: data?.status === "ACTIVO" ? "BLOQUEADO" : "ACTIVO",
      username: data?.email,
    };
    setIsLoading(true);
    try {
      const response = await API.graphql({
        query: updateAgencyCognito,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: params,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    reset();
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
                <h2>
                  {data.status === "ACTIVO"
                    ? "Bloquear empresa"
                    : "Habilitar empresa"}
                </h2>
              </div>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Motivo"
                    variant="outlined"
                    value={motivo}
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    onChange={(e) => setMotivo(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Descripcion"
                    variant="outlined"
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <div className={styles.button}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onHandleRegister}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress /> : "Bloquear empresa"}
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={reset}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
