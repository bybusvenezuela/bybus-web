import * as React from "react";
import styles from "@/styles/Card.module.css";
import Link from "next/link";

const Card = ({ icon, onHandle, title }) => {
  return (
    <div className={styles.container} onClick={onHandle}>
      <div className={styles.icon}>
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default Card;
