import React from 'react'
import Menu from "@/components/Menu";
import styles from "@/styles/Home.module.css";

const UserPanel = () => {
  return (
    <div className={styles.content}>
      <Menu />
      <div>UserPanel</div>
    </div>
  )
}

export default UserPanel