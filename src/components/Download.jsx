import React from "react";
import Link from "next/link";
import { download } from "@/constants";
import styles from "@/styles/Download.module.css";
import Image from "next/image";

const Download = () => {
  return (
    <div className="container section">
      <div className={styles.background}>
        <div className={styles.backgroundImage}>
          <Image src={download.backgroundImage} alt="" />
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            <h2>{download.title}</h2>
            <p>{download.subtitle}</p>
            <div className={styles.button}>
              <p>{download.button.title}</p>
              <Image src={download.button.image} alt="" />
            </div>
          </div>
          <div className={styles.right}>
            <Image src={download.mainImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
