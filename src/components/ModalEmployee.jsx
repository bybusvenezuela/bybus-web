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

export default function ModalEmployee({ open, close, offices }) {
  const [office, setOffice] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState("");

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
  const handlePermissions = (e) => {
    const {
      target: { value },
    } = e;
    setPermissions(typeof value === "string" ? value.split(",") : value);
  };
  const onCreateOffice = async () => {
    setIsloading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      await API.graphql({
        query: mutations.createEmployee,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            type: type,
            agencyID: user.attributes["custom:agencyID"],
            officeID: office,
          },
        },
      });
    } catch (error) {
      const { message } = new Error(error);
      console.error("error al crear empelado: ", message);
    }
    setIsloading(false);
    resetModal();
  };

  const typesEmployees = [
    {
      value: "OFFICE",
      name: "OFICINISTA",
    },
    {
      value: "COLLECTOR",
      name: "COBRADOR",
    },
  ];

  const resetModal = () => {
    setEmail("");
    setName("");
    setType("");
    setOffice("");
    setPhone("");
    close();
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
                <h2>Registrar nuevo empleado</h2>
              </div>
              <div className={styles.inputs}>
                <FormControl fullWidth>
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
                </FormControl>

                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormControl
                    sx={{
                      width: 400,
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={type}
                      label="Tipo"
                      onChange={(e) => setType(e.target.value)}
                    >
                      {typesEmployees?.map((item, index) => (
                        <MenuItem
                          value={item.value}
                          key={index}
                          sx={{
                            textTransform: "uppercase",
                          }}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Telefono"
                    variant="outlined"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <TextField
                  id="outlined-basic"
                  label="Correo Electronico"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <Button variant="contained" size="large" onClick={onCreateOffice}>
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
