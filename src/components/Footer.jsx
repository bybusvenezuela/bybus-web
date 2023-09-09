import React, { useState } from "react";
import Link from "next/link";
import { footer } from "@/constants";
import styles from "@/styles/Footer.module.css";
import Image from "next/image";
import { getEmailSubscriptionbyEmail } from "@/graphql/queries";
import { createEmailSusbcription } from "@/graphql/mutations";
import { API } from "aws-amplify";
const Footer = () => {
  const [email, setEmail] = useState("");
  const { contact, links, legal, newsletter } = footer;

  const onHandleSubscription = async () => {
    try {
      if (!email) return;
      console.log(email);
      const byEmail = await API.graphql({
        query: getEmailSubscriptionbyEmail,
        authMode: "AWS_IAM",
        variables: {
          email: email,
        },
      });
      if (!byEmail.data) return setEmail("");
      const result = await API.graphql({
        query: createEmailSusbcription,
        authMode: "AWS_IAM",
        variables: {
          input: {
            email: email,
          },
        },
      });
      if (result?.data) alert("Email registrado");
      setEmail("");
    } catch (error) {
      console.error("ERROR AL SUSBCRIBIR CORREO: ", error);
      alert("Error al subscribir correo");
    }
  };
  return (
    <div className="container section">
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.contact}>
            <Image src={contact.logo} alt="" width={85} height={28} />
            {contact.info.map((item) => (
              <div key={item.id}>
                <i className={item.icon}></i>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.links}>
            <h2>{links.title}</h2>
            <div className={styles.linksContent}>
              {links.pages.map((item) => (
                <Link href={`${item.link}`} key={item.id}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.legal}>
            <h2>{legal.title}</h2>
            <div className={styles.legalContent}>
              {legal.pages.map((item) => (
                <Link href={`${item.link}`} key={item.id}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.newsletter}>
            <h2>{newsletter.title}</h2>
            <p>{newsletter.subtitle}</p>
            <div className={styles.input}>
              <input
                type="text"
                name=""
                placeholder={newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value.toLocaleUpperCase())}
              />
              <button onClick={onHandleSubscription}>
                {newsletter.button}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.bot}>
          <p>{footer.copy}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
