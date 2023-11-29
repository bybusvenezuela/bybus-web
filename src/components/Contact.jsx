import React, { useRef, useState } from "react";
import { baseContact, buttons, cardContact } from "../constants/index";
import styles from "@/styles/Contact.module.css";
import { createAgencySubscription } from "@/graphql/custom/mutations";
import {
  getAgencySubscriptionbyRif,
  getAgencySubscriptionbyEmail,
} from "@/graphql/custom/queries";
import { CircularProgress, Button } from "@mui/material";
import { API } from "aws-amplify";
const Contact = ({ contactRef }) => {
  const form = useRef();
  const [name, setName] = useState("");
  const [rif, setRif] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setLoading] = useState(false);
  const sendEmail = async (e) => {
    e.preventDefault();
    if ((!name, !rif, !email, !phone))
      return alert("Formulario: campos vacios");
    const params = {
      input: {
        name,
        rif,
        email,
        phone,
      },
    };
    setLoading(true);
    try {
      // verificamos si el rif ya existe
      const byRif = await API.graphql({
        query: getAgencySubscriptionbyRif,
        authMode: "AWS_IAM",
        variables: {
          rif: rif,
        },
      });
      // si existe condicionamos
      if (byRif?.data?.getAgencySubscriptionbyRif?.items.length > 0) {
        const status =
          byRif?.data?.getAgencySubscriptionbyRif?.items[0]?.status;
        if (status === "ACCEPTED")
          return alert(`RIF: ${rif}. ya esta registrado en nuestro sistema`);
        if (status === "PENDING" || status === "SCHEDULED")
          return alert(`RIF: ${rif}. ya tiene una solicitud pendiente`);
        if (status === "REJECTED")
          return alert(`RIF: ${rif}. rechazado, llamar a soporte`);
      }
      // verificamos si el email ya existe
      const byEmail = await API.graphql({
        query: getAgencySubscriptionbyEmail,
        authMode: "AWS_IAM",
        variables: {
          email: email,
        },
      });

      //si existe email vemos el porque
      if (byEmail?.data?.getAgencySubscriptionbyEmail?.items.length > 0) {
        const statusbyEmail =
          byEmail?.data?.getAgencySubscriptionbyEmail?.items[0]?.status;
        if (statusbyEmail === "ACCEPTED")
          return alert(
            `Correo electronico: ${email}. ya esta registrado en nuestro sistema`
          );
        if (statusbyEmail === "PENDING" || statusbyEmail === "SCHEDULED")
          return alert(
            `Correo electronico: ${email}. ya tiene una solicitud pendiente`
          );
        if (statusbyEmail === "REJECTED")
          return alert(
            `Correo electronico: ${email}. rechazado, llamar a soporte`
          );
      }
      // de no existe email o rif enviamsop petciion
      // enviamos peticion
      await API.graphql({
        query: createAgencySubscription,
        authMode: "AWS_IAM",
        variables: params,
      });
      alert(
        "Formulario enviado",
        "ByBus se comunicara con usted lo mas pronto posible"
      );
      clean();
    } catch (error) {
      setLoading(false);
      alert("Error al enviar el formulario");
      console.error("ERROR AL ENVIAR FORMUALRIO: ", error);
    }
    setLoading(false);
  };

  const clean = () => {
    setName("");
    setRif("");
    setEmail("");
    setPhone("");
  };
  return (
    <div className="section container" ref={contactRef} id="contact-us">
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
              placeholder={`BYBUS C.A`}
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              maxLength={250}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>RIF</label>
            <input
              type="text"
              className={styles.input}
              placeholder="JXXXXXXXX"
              value={rif}
              onChange={(e) => setRif(e.target.value.toUpperCase())}
              maxLength={10}
              minLength={10}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Correo electrónico</label>
            <input
              type="email"
              className={styles.input}
              placeholder="ejemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              minLength={10}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Número de teléfono</label>
            <input
              type="text"
              className={styles.input}
              placeholder="+58 00 0000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value.toUpperCase())}
              maxLength={100}
            />
          </div>
          <div className={styles.send}>
            <input type="submit" value="Enviar" className={styles.button} />
            {/* <input
            className={styles.button}
            style={{ color: "white" }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress /> : "Enviar"}
          </input> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
