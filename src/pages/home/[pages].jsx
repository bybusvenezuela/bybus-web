import React from 'react'
import Menu from "@/components/Menu";
import styles from "@/styles/Home.module.css";

const Pages = () => {
  return (
    <div className={styles.content}>
      <Menu />
      <div>Pages</div>
    </div>
  )
}

export default Pages