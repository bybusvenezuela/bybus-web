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
import Contact from "@/components/Contact";
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
      {/* Contact Form */}
      <Contact />
      {/* Footer */}
      <Footer />
    </div>
  );
}
