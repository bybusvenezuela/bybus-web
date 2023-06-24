import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "@/styles/Modal.module.css";
import { useState } from "react";

export default function ModalTicket({ open, close }) {
  const [agency, setAgency] = useState("");

  const handleAgency = (event) => {
    setAgency(event.target.value);
  };
  const agencies = [
    { agency: "Agencia Generica C.A", value: 1 },
    { agency: "Agencia Generica C.A", value: 2 },
    { agency: "Agencia Generica C.A", value: 3 },
    { agency: "Agencia Generica C.A", value: 4 },
    { agency: "Agencia Generica C.A", value: 5 },
    { agency: "Agencia Generica C.A", value: 6 },
    { agency: "Agencia Generica C.A", value: 7 },
  ];
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
                <h2>Register a new agency</h2>
              </div>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Agency
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={agency}
                      label="Agency"
                      onChange={handleAgency}
                    >
                      {agencies.map((item, index) => (
                        <MenuItem value={item.value} key={index}>{item.agency}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Name ticket"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <Button variant="contained" size="large">
                Register
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={close}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
