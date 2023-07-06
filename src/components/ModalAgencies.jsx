import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import styles from "@/styles/Modal.module.css";
import { API, Storage } from "aws-amplify";
import { createAgency } from "@/graphql/CustomMutations";

export default function ModalAgencies({ open, close, data }) {
  const [edit, setEdit] = useState(true);
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [rif, setRif] = useState(data.rif);
  const [phone, setPhone] = useState(data.phone);
  const reset = () => {
    setEdit(true);
    setName("");
    setEmail("");
    setRif("");
    setPhone("");
    close();
  };
  const fetchAgency = async () => {
    try {
      const result = await API.graphql({
        query: createAgency,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: {
            userID: data.id,
            name: name ? name : data.name,
            rif: rif ? rif : data.rif,
            email: email ? email : data.email,
            phone: phone ? phone : data.phone,
          },
        },
      });
      console.log(result)
    } catch (error) {
      console.error("error", error);
    }
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
                <h2>Registrar agencia</h2>
              </div>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    defaultValue={data.name}
                    variant="outlined"
                    disabled={edit}
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    defaultValue={data.email}
                    variant="outlined"
                    disabled={edit}
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    defaultValue={data.rif}
                    variant="outlined"
                    disabled={edit}
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    onChange={(e) => setRif(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    defaultValue={data.phone}
                    variant="outlined"
                    disabled={edit}
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
                <Button variant="contained" size="large" onClick={fetchAgency}>
                  Registrar
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={reset}
                >
                  Cancelar
                </Button>
              </div>

              <div>
                <Button
                  variant="contained"
                  size="large"
                  color="warning"
                  onClick={() => setEdit(!edit)}
                >
                  Editar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
