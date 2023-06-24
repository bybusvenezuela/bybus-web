import React, { useRef, useState } from "react";
import { baseContact, buttons, cardContact } from "../constants/index";
import styles from "@/styles/Contact.module.css";
import { createAgencySubscription } from '@/graphql/CustomMutations/Contact'
import { API } from 'aws-amplify'
import { getAgencySubscriptionbyEmail, getAgencySubscriptionbyRif } from "@/graphql/CustomQueries/Contact";
const Contact = ({ contactRef }) => {
  const form = useRef();
  const [name, setName] = useState("");
  const [rif, setRif] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const sendEmail = async (e) => {
    e.preventDefault();
    if (!name, !rif, !email, !phone) return alert("FORMULARIO: CAMPOS VACIOS")
    try {
      const params = {
        input: {
          name,
          rif,
          email,
          phone,
        }
      }
      // verificamos si el rif ya existe
      const byRif = await API.graphql({
        query: getAgencySubscriptionbyRif,
        authMode: "AWS_IAM",
        variables: {
          "rif": rif
        }
      })
      const status = byRif?.data?.getAgencySubscriptionbyRif?.items[0]?.status;
      console.log(status)
      if (status === "ACCEPTED") return alert(`Rif: ${rif}, ya registrado en nuestro sistema`)
      if (status === "PENDING" || status === "SCHEDULED") return alert(`Rif: ${rif}, ya tiene una solicitud pendiente`)
      if (status === "REJECTED") return alert(`Rif: ${rif}, Rechazado llamar a soporte`)

      // verificamos si el email ya existe 
      const byEmail = await API.graphql({
        query: getAgencySubscriptionbyEmail,
        authMode: "AWS_IAM",
        variables: {
          email: email
        }
      })
      const statusbyEmail = byEmail?.data?.getAgencySubscriptionbyEmail?.items[0]?.status
      if (statusbyEmail === "ACCEPTED") return alert(`Email: ${email}, ya registrado en nuestro sistema`)
      if (statusbyEmail === "PENDING" || status === "SCHEDULED") return alert(`Email: ${email}, ya tiene una solicitud pendiente`)
      if (statusbyEmail === "REJECTED") return alert(`Email: ${email}, Rechazado llamar a soporte`)
      // enviamos peticion

      await API.graphql({
        query: createAgencySubscription,
        authMode: "AWS_IAM",
        variables: params
      });
      alert("FORMULARIO ENVIADO")
      clean();
    } catch (error) {
      alert("ERROR AL ENVIAR FORMUALRIO")
      console.error("ERROR AL ENVIAR FORMUALRIO: ", error);
    }
  };

  const clean = () => {
    setName("")
    setRif("")
    setEmail("")
    setPhone("")
  }
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
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Rif</label>
            <input
              type="text"
              className={styles.input}
              placeholder="J-XXXXXXXX"
              value={rif}
              onChange={(e) => setRif(e.target.value.toUpperCase())}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>correo electrónico</label>
            <input
              type="email"
              className={styles.input}
              placeholder="ejemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.toUpperCase())}
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
            />
          </div>

          <button className={styles.button}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
