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
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";

export default function ModalEmployee({ open, close, offices }) {
  const [office, setOffice] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [phone, setPhone] = useState("");

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
    const user = await Auth.currentAuthenticatedUser();
    const employee = await API.graphql({
      query: mutations.createEmployee,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        input: {
          name: name.trim(),
          phone: phone.trim(),
          type: type,
          agencyID: user.attributes.sub,
          officeID: office,
          permissions: permissions
        },
      },
    });
    console.log(employee);
  };

  const typesEmployees = [
    {
      value: "OFFICE",
      name: "Operador",
    },
    {
      value: "COLLECTOR",
      name: "Cobrador",
    },
  ];

  const permissionsEmployees = [
    {
      value: "QRSCAN",
      name: "Escaner QR",
    },
    {
      value: "BOOOKING_READ",
      name: "Ver viajes",
    },
    {
      value: "BOOOKING_CREATED",
      name: "Crear viajes",
    },
    {
      value: "BOOOKING_UPDATED",
      name: "Actualizar viajes",
    },
    {
      value: "BOOOKING_DELETED",
      name: "Borrar viajes",
    },
    {
      value: "BALANCE_OFFICE_READ",
      name: "Ver estadisticas de la oficina",
    },
  ];

  const resetModal = () => {
    setName('')
    setType('')
    setPermissions([])
    setOffice('')
    setPhone('')
    close()
  }

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
                  <FormControl
                    sx={{
                      width: 360,
                    }}
                  >
                    <InputLabel id="demo-multiple-checkbox-label">
                      Permisos
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={permissions}
                      onChange={handlePermissions}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {permissionsEmployees?.map((item, index) => (
                        <MenuItem
                          value={item.value}
                          key={index}
                          sx={{
                            textTransform: "uppercase",
                          }}
                        >
                          <Checkbox
                            checked={permissions.indexOf(item.value) > -1}
                          />
                          <ListItemText primary={item.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Telefono"
                    variant="outlined"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <Button variant="contained" size="large" onClick={() => {
                onCreateOffice()
                resetModal()
              }}>
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
