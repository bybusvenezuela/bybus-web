import React from "react";
import Link from "next/link";
import { faq } from "@/constants";
import styles from "@/styles/FAQ.module.css";
import Image from "next/image";

const FAQ = () => {
  return (
    <div className="container section">
      <div className={styles.content}>
        <div className={styles.title}>
          <p>{faq.title}</p>
          <h2>{faq.subtitle}</h2>
        </div>
        <div className={styles.questions}>
          {faq.questions.map((item) => (
            <div className={`${styles.question} ${item.status}`} key={item.id}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
