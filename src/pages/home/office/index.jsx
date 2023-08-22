import Menu from "@/components/Menu";
import React from "react";
import styles from "@/styles/Home.module.css";

const Office = () => {
  return (
    <div className={styles.content}>
      <Menu />
      <div>Office</div>
    </div>
  );
};

export default Office;
