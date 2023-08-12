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

  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let randomString = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  };

  const onHandleRegister = async () => {
    setIsloading(true);
    try {
      const temporaryPassword = generateRandomString();
      console.log(temporaryPassword);
      // registrar agencia
      const response = await API.graphql({
        query: mutations.registerAgencyUser,
        variables: {
          input: {
            username: email.trim().toLowerCase(),
            name: name.trim().toUpperCase(),
            password: temporaryPassword,
            rif: rif.trim(),
            phone: phone,
            userType: "agency",
          },
        },
      });
      console.log("RESPONSE: ", response);
      // cambiamos
    } catch (error) {
      console.error("ERROR AL REGISTAR AGENCIA: ", error);
      setIsloading(false);
    }
    setIsloading(false);
  };

  const addUserToGroup = async (username = "") => {
    if (username === "") return;
    let apiName = "AdminQueries";
    let path = "/addUserToGroup";
    let myInit = {
      body: {
        username: username,
        groupname: "agency",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    const response = await API.post(apiName, path, myInit);
    console.log(response);
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
