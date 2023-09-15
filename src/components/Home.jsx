import React from "react";
import Image from "next/image";
import Link from "next/link";
import { home } from "@/constants";
import styles from "@/styles/Home.module.css";

const Home = ({ homeRef }) => {
  return (
    <div className="container section" id="home" ref={homeRef}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.top}>
            <h2 className={styles.title}>{home.title}</h2>
            <p className={styles.subtitle}>{home.subtitle}</p>
            <div className={styles.buttons}>
              <Link href={home.buttons.one.link} className={styles.buttonGet}>
                <p>{home.buttons.one.title}</p>
                <i className={home.buttons.one.icon}></i>
              </Link>
              <Link href={home.buttons.two.link} className={styles.buttonVideo} target='_blank' >
                <i className={home.buttons.two.icon}></i>
                <p>{home.buttons.two.title}</p>
              </Link>
            </div>
          </div>
          <div className={styles.bot}>
            {/* <Image src={home.stickImage} alt="" width={1000} height={1000} /> */}
          </div>
        </div>
        <div className={styles.right}>
          <Image src={home.mainImage} alt="" width={1000} height={1000} />
        </div>
      </div>
    </div>
  );
};

export default Home;
