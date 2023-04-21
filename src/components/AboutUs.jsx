import React from "react";
import Link from "next/link";
import { aboutus } from "@/constants";
import styles from "@/styles/AboutUs.module.css";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="container section">
      <div className={styles.content}>
        <div className={styles.top}>
          <p>{aboutus.title}</p>
          <h2>{aboutus.question}</h2>
        </div>
        <div className={styles.bot}>
          <div className={styles.left}>
            <Image src={aboutus.mainImage} alt="" />
          </div>
          <div className={styles.right}>
            <h3>{aboutus.subtitle}</h3>
            <p>{aboutus.paragraph}</p>
            <Image src={aboutus.usersImage} alt="" />
            <h4>{aboutus.userText}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
