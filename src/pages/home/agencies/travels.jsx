import Menu from "@/components/Menu";
import React from "react";
import styles from "@/styles/Agencies.module.css";
import TableTravels from "@/components/TableTravels";

const List = () => {
  return (
    <div className={styles.content}>
      <Menu />
      <div className="container section">
        <div className={styles.agencies}>
          <div className={styles.title}>
            <h2>List of Travels</h2>
          </div>
          <TableTravels />
        </div>
      </div>
    </div>
  );
};

export default List;