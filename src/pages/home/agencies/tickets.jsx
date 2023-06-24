import Menu from "@/components/Menu";
import React from "react";
import styles from "@/styles/Agencies.module.css";
import TableTickets from "@/components/TableTickets";

const List = () => {
  return (
    <div className={styles.content}>
      <Menu />
      <div className="container section">
        <div className={styles.agencies}>
          <div className={styles.title}>
            <h2>List of Tickets</h2>
          </div>
          <TableTickets />
        </div>
      </div>
    </div>
  );
};

export default List;