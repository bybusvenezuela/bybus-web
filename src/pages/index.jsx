import { Login } from "@/sections";
import Profiles from "@/sections/Profiles";
import styles from "@/styles/Main.module.css";

export default function Main() {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
}
