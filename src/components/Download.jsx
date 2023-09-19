import React from "react";
import Link from "next/link";
import { download } from "@/constants";
import styles from "@/styles/Download.module.css";
import Image from "next/image";

const Download = () => {
  return (
    <div className="container section">
      <div className={styles.background}>
        <div className={styles.content}>
          <div className={styles.left}>
            <h2>{download.title}</h2>
            <p>{download.subtitle}</p>
            <div className={styles.button}>
              <p>{download.button.title}</p>
              <Image className={styles.google} src={download.button.image} alt="" width={1000} height={1000} />
              <div className={styles.line}></div>
              <Image className={styles.apple} src={download.button.apple} alt="" width={1000} height={1000} />
            </div>
          </div>
          <div className={styles.right}>
            <Image src={download.mainImage} alt="" width={1000} height={1000} className={styles.mainImage}/>
            <Image src={download.secondImage} alt="" width={1000} height={1000} className={styles.secondImage}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
