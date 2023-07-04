import React, { useState } from "react";
import Menu from "@/components/Menu";
import styles from "@/styles/Dashboard.module.css";
import TableAgencies from "@/components/TableAgencies";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "@/components/Card";
import ModalOffice from "@/components/ModalOffice";
import ModalTravel from "@/components/ModalTravel";
import ModalEmployee from "@/components/ModalEmployee";

const Dashboard = () => {
  const [office, setOffice] = useState(false)
  const [employee, setEmployee] = useState(false)
  const [travels, setTravels] = useState(false)
  const openOffice = () => {
    setOffice(true)
  }
  const openEmployee = () => {
    setEmployee(true)
  }
  const openTravels = () => {
    setTravels(true)
  }
  return (
    <div className={styles.content}>
      <Menu />
      <div className="container section">
        <div className={styles.pages}>
          <div className={styles.panel}>
            <Card
              title={`Agregar una nueva oficina`}
              onHandle={openOffice}
              icon={`bx bx-store`}
            />
            <Card
              title={`Agregar un nuevo empleado`}
              onHandle={openEmployee}
              icon={`bx bx-bus`}
            />
            <Card
              title={`Crear un nuevo viaje`}
              onHandle={openTravels}
              icon={`bx bx-lock`}
            />
          </div>
          <div className={styles.agencies}>
            <div className={styles.title}>
              <h2>Lista de Oficinas</h2>
            </div>
          <TableAgencies />
          </div>
          <div className={styles.users}>
            <div className={styles.title}>
              <h2>Lista de Empleados</h2>
            </div>
          <TableAgencies />
          </div>
          <ModalOffice open={office} close={() => setOffice(!office)} />
          <ModalEmployee open={employee} close={() => setEmployee(!employee)} />
          <ModalTravel open={travels} close={() => setTravels(!travels)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
