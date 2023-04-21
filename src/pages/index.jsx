import {
  Navbar,
  Home,
  Advantages,
  Customizable,
  AboutUs,
  FAQ,
  Download,
  Footer,
} from "@/components";
import styles from "@/styles/Main.module.css";

export default function Main() {
  return (
    <div className={styles.container}>
      {/* Home */}
      <Navbar />
      <Home />
      {/* Feature */}
      <Advantages />
      <Customizable />
      {/* About Us */}
      <AboutUs />
      {/* FAQ */}
      <FAQ />
      {/* Donwload */}
      <Download />
      {/* Footer */}
      <Footer />
    </div>
  );
}
