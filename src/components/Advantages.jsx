import React from "react";
import Link from "next/link";
import { advantages } from "@/constants";
import styles from "@/styles/Advantages.module.css";
import Image from "next/image";

const Advantages = () => {
  return (
    <div className="container section" id='advantages'>
      <div className={styles.content}>
        <div className={styles.left}>
          <p className={styles.title}>{advantages.title}</p>
          <h2 className={styles.question}>{advantages.question}</h2>
          <div className={styles.subtitle}>
            <div className={styles.icon}>
              <i className={advantages.icon}></i>
            </div>
            <p>{advantages.subtitle}</p>
          </div>
          <p className={styles.paragraph}>{advantages.paragraph}</p>
        </div>
        <div className={styles.right}>
          <Image src={advantages.mainImage} alt="" width={1000} height={1000} />
        </div>
      </div>
    </div>
  );
};

export default Advantages;
