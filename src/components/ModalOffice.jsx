import * as React from "react";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import styles from "@/styles/Modal.module.css";
import { useState } from "react";

export default function ModalOffice({ open, close }) {
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
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                  />
                </div>
                <div className={styles.input}>
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <Button variant="contained" size="large">
                Register
              </Button>
              <Button variant="contained" size="large" color="error" onClick={close}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
