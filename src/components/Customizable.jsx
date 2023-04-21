import React from "react";
import Link from "next/link";
import { customizable } from "@/constants";
import styles from "@/styles/Customizable.module.css";
import Image from "next/image";

const Customizable = () => {
  return (
    <div className="container section">
      <div className={styles.content}>
        <div className={styles.left}>
          <Image src={customizable.mainImage} alt="" />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <div className={styles.icon}>
              <i className={customizable.icon}></i>
            </div>
            <p>{customizable.title}</p>
          </div>
          <p className={styles.paragraph}>{customizable.paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default Customizable;
