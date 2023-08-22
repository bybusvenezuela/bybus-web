import React from 'react'
import Menu from "@/components/Menu";
import styles from "@/styles/Home.module.css";

const Employee = () => {
  return (
    <div className={styles.content}>
      <Menu />
      <div>Employee</div>
    </div>
  )
}

export default Employee