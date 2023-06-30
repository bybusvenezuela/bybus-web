import React, { useRef, useState } from "react";
import styles from "@/styles/Profiles.module.css";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Modal from "@mui/material/Modal";
import { TextField, Button } from "@mui/material";
import Link from "next/link";

const Profiles = () => {
  const [visible, setVisible] = useState(false);
  const [pin, setPin] = useState([]);
  const one = useRef();
  const two = useRef();
  const three = useRef();
  const four = useRef();
  const five = useRef();
  const six = useRef();
  return (
    <div className="container section">
      <div className={styles.content}>
        <h1 className={styles.title}>Elija un perfil para acceder al panel</h1>
        <div className={styles.profiles}>
          <div className={styles.profile} onClick={() => setVisible(true)}>
            <ManageAccountsRoundedIcon
              sx={{ color: "rgba(0, 0, 0, 0.85)", height: 100, width: 100 }}
            />
            <p>Administrador</p>
          </div>
          <div className={styles.profile} onClick={() => setVisible(true)}>
            <PersonRoundedIcon
              sx={{ color: "rgba(0, 0, 0, 0.85)", height: 100, width: 100 }}
            />
            <p>Empleado Luis</p>
          </div>
          <div className={styles.profile} onClick={() => setVisible(true)}>
            <PersonRoundedIcon
              sx={{ color: "rgba(0, 0, 0, 0.85)", height: 100, width: 100 }}
            />
            <p>Empleado Chris</p>
          </div>
        </div>
      </div>
      <Modal
        open={visible}
        // onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div
              className={styles.arrow}
              onClick={() => {
                setVisible(false);
                setPin([]);
              }}
            >
              <ArrowBackRoundedIcon
                sx={{
                  color: "rgba(0, 0, 0, 0.85)",
                  height: 30,
                  width: 30,
                }}
              />
            </div>
            <div className={styles.panel}>
              <h2 className={styles.modalTitle}>Ingresa tu PIN</h2>
              <div className={styles.inputs}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                    two.current.focus();
                  }}
                  inputRef={one}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                    three.current.focus();
                  }}
                  inputRef={two}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                    four.current.focus();
                  }}
                  inputRef={three}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                    five.current.focus();
                  }}
                  inputRef={four}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                    six.current.focus();
                  }}
                  inputRef={five}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                  }}
                  inputRef={six}
                />
              </div>
              <Link href={`/home/dashboard`}>
                <Button variant="contained" size="large">
                  Ingresar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profiles;
