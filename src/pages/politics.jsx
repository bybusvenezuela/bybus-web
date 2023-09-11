import { politics } from '@/constants'
import React from 'react'
import styles from "@/styles/Terms.module.css";

const Politics = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{politics.title}</h1>
      <p className={styles.content}>{politics.content}</p>
    </div>
  )
}

export default Politics