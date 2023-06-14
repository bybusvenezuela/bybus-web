import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import { navbar } from "../constants";
import Link from "next/link";
import CustomImage from './CustomImage'
import { useState, useEffect } from "react";




const Navbar = () => {

  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  return (
    <div className="container section">
      <div className={styles.navbar}>
        <div className={styles.left}>
          <CustomImage
            path={"logo.png"}
            width={width > 500 ? 130 : 130}
            height={50}
          />
          <div className={styles.menu}>
            {navbar.menu.map((item) => (
              <Link href={`${item.id}`} key={item.id}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <Link href="/" key={navbar.button.id} className={styles.button}>
            <p>{navbar.button.title}</p>
            <Image src={navbar.button.logo} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
