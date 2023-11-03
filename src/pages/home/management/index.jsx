import Menu from "@/components/Menu";
import React from "react";
import styles from "@/styles/Management.module.css";

const Management = () => {
  return (
    <div className={styles.content}>
      <Menu />
      <div className="container section">Gestion de Pagos</div>
    </div>
  );
};

export default Management;
