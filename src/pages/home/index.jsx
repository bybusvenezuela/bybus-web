import Menu from "@/components/Menu";
import React from "react";
import styles from "@/styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.content}>
      <Menu />
      <div>Home</div>
    </div>
  );
};

export default Home;
