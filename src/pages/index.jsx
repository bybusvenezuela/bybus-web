import React, { useRef } from "react"
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
  const homeRef = useRef(null);
  const contactRef = useRef(null);

  const onHandleClick = (section) => {
    console.log(section)
    console.log(contactRef)
    const refs = {
      home: homeRef,
      "contact-us": contactRef,
      // Otras referencias a las secciones
    };

    const sectionRef = refs[section];
    if (sectionRef && sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* Home */}
      <Navbar onHandleClick={onHandleClick} />
      <Home homeRef={homeRef} />
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
      <Contact contactRef={contactRef} />
      {/* Footer */}
      <Footer />
    </div>
  );
}
