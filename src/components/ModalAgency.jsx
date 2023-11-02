import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Button, TextField, CircularProgress } from "@mui/material";
import styles from "@/styles/Modal.module.css";
import { API } from "aws-amplify";
import { createAgency, registerAgencyAdmin } from "@/graphql/mutations";

export default function ModalAgency({ open, close }) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rif, setRif] = useState("");
  const [phone, setPhone] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setRif("");
    setPhone("");
    setIsLoading(false);
    close();
  };

  const onHandleRegister = async () => {
    const params = {
        username: email,
        name: name,
        rif: rif,
        phone: phone,
        agencySubsTableID: '',
      };
    console.log(params)
    setIsLoading(true);
    try {
      // registrar agencia
      const response = await API.graphql({
        query: registerAgencyAdmin,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: params,
        },
      });
      console.log("RESPONSE: ", response);
      // cambiamos
    } catch (error) {
      console.error("ERROR AL REGISTAR AGENCIA: ", error);
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
                <h2>Registrar agencia</h2>
              </div>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    value={name}
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Correo electronico"
                    variant="outlined"
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="RIF"
                    variant="outlined"
                    value={rif}
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    onChange={(e) => setRif(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Telefono"
                    variant="outlined"
                    value={phone}
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    onChange={(e) => setPhone(e.target.value)}
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
                  {isLoading ? <CircularProgress /> : "Registrar"}
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
