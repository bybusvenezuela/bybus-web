import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import { navbar } from "../constants";
import Link from "next/link";

const Navbar = ({ onHandleClick = () => {} }) => {
  return (
    <div className="container section">
      <div className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.logoContent}>
            <Image
              src={navbar.logo}
              alt=""
              width={0}
              height={0}
              className={styles.logo}
            />
            <p>ByBus</p>
          </div>

          <div className={styles.menu}>
            {navbar.menu.map((item) => (
              <Link href={`#${item.id}`} key={item.id}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <Link href="/" key={navbar.button.id} className={styles.button}>
            <p>{navbar.button.title}</p>
            <Image src={navbar.button.logo} alt="" className={styles.google} />
            <div className={styles.line}></div>
            <Image src={navbar.button.apple} alt="" className={styles.apple} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
