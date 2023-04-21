import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import { navbar } from "../constants";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="container section">
      <div className={styles.navbar}>
        <div className={styles.left}>
          <Image src={navbar.logo} alt="" />
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
