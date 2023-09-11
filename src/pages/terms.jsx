import { terms } from '@/constants'
import React from 'react'
import styles from "@/styles/Terms.module.css";

const Terms = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{terms.title}</h1>
      <p className={styles.content}>{terms.content}</p>
    </div>
  )
}

export default Terms