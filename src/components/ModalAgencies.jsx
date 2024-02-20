import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Button, TextField, CircularProgress } from "@mui/material";
import styles from "@/styles/Modal.module.css";
import { API } from "aws-amplify";
import { registerAgencyAdmin } from "@/graphql/mutations";
import { updateAgency } from "@/graphql/custom/mutations";
export default function ModalAgencies({ open, close, data, type }) {
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rif, setRif] = useState("");
  const [tableID, setTableID] = useState("");
  const [phone, setPhone] = useState("");
  const [percentage, setPercentage] = useState(
    data?.percentage ? data?.percentage : 10
  );

  const reset = () => {
    setEdit(true);
    setName("");
    setEmail("");
    setRif("");
    setPhone("");
    setTableID("");
    setPercentage(10);
    setIsLoading(false);
    close();
  };
  useEffect(() => {
    if (open) {
      setName(data.name);
      setEmail(data.email);
      setRif(data.rif);
      setPhone(data.phone);
      setTableID(data.id);
      setPercentage(data?.percentage ? data?.percentage : 10);
    }
  }, [data]);

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
    const params = {
      username: email,
      name: name,
      rif: rif,
      phone: phone,
      percentage: percentage,
      agencySubsTableID: tableID,
    };
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

  const onHandleEdit = async () => {
    console.log("listo ara editar");
    const params = {
      id: data?.id,
      percentage,
      name,
      email,
      rif,
      phone,
    };
    setIsLoading(true);
    try {
      await API.graphql({
        query: updateAgency,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: params,
        },
      });
    } catch (error) {
      console.error(" ERROR EN ACTUALIZAR AGENCIA: ", error);
      setIsLoading(false);
    }
    reset();
  };

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
                  {type === "edit" ? `Editar agencia` : `Registrar agencia`}
                </h2>
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
                  <TextField
                    id="outlined-basic"
                    label="Porcentaje %"
                    variant="outlined"
                    value={percentage}
                    disabled={edit}
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    onChange={(e) => setPercentage(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <div className={styles.button}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={type === "edit" ? onHandleEdit : onHandleRegister}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress />
                  ) : type === "edit" ? (
                    `GUARDAR`
                  ) : (
                    `Registrar`
                  )}
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

              <div>
                <Button
                  variant="contained"
                  size="large"
                  color="warning"
                  onClick={() => setEdit(!edit)}
                  disabled={isLoading}
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
