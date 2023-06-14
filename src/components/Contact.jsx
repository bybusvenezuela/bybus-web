import React, { useRef } from "react";
import { baseContact, buttons, cardContact } from "../constants/index";
import styles from "@/styles/Contact.module.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  };
  return (
    <div className="section container">
      <div className={styles.sectionTitle}>
        <p className={styles.text}>{`Formulario`}</p>
        <h2 className={styles.title}>{`Contáctanos`}</h2>
      </div>

      <div className={styles.contact}>
        <div className={styles.cards}>
          {cardContact.map((card, index) => (
            <div className={styles.card} key={index}>
              <i className={`${card.icon} icon-social`}></i>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardData}>{card.data}</p>
            </div>
          ))}
        </div>

        <form className={styles.form} ref={form} onSubmit={sendEmail}>
          <div className={styles.field}>
            <label className={styles.label}>Razón social</label>
            <input
              type="text"
              className={styles.input}
              placeholder={`Burguer's Goku`}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Rif</label>
            <input
              type="text"
              className={styles.input}
              placeholder="0000000J"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>correo electrónico</label>
            <input
              type="email"
              className={styles.input}
              placeholder="ejemplo@email.com"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Número de teléfono</label>
            <input
              type="text"
              className={styles.input}
              placeholder="+58 00 0000 000"
            />
          </div>

          <button className={styles.button}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
