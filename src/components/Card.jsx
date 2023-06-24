import * as React from "react";
import styles from "@/styles/Card.module.css";
import Link from "next/link";

const Card = ({ icon, link, title }) => {
  return (
    <Link className={styles.container} href={link}>
      <div className={styles.icon}>
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
    </Link>
  );
};

export default Card;
