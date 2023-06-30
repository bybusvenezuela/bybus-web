import Menu from "@/components/Menu";
import React from "react";
import styles from "@/styles/Agencies.module.css";
import TableAgencies from "@/components/TableAgencies";

const List = () => {
  return (
    <div className={styles.content}>
      <Menu />
      <div className="container section">
        <div className={styles.agencies}>
          <div className={styles.title}>
            <h2>List of Agencies</h2>
          </div>
          <TableAgencies />
        </div>
      </div>
    </div>
  );
};

export default List;
