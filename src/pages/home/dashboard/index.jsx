import React, { useEffect, useState } from "react";
import Menu from "@/components/Menu";
import styles from "@/styles/Dashboard.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "@/components/Card";
import ModalOffice from "@/components/ModalOffice";
import ModalTravel from "@/components/ModalTravel";
import ModalEmployee from "@/components/ModalEmployee";
import { useUser } from "@/context/UserContext";
import { Auth, API } from "aws-amplify";
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
import TableEmployees from "@/components/TableEmployees";
import TableOffices from "@/components/TableOffices";
import ModalTransport from "@/components/ModalTransport";

const Dashboard = () => {
  const [office, setOffice] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [travels, setTravels] = useState(false);
  const [transport, setTransport] = useState(false);
  const [data, setData] = useState({});
  
  const Agency = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const list = await API.graphql({
      query: queries.getAgency,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        userID: user.attributes.sub,
      },
    });
    const listBook = await API.graphql({
      query: queries.listBookings,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        agencyID: list.data.getAgency.id,
      },
    });
    setData(list.data.getAgency)
  };

  const openOffice = () => {
    setOffice(true);
  };
  const openEmployee = () => {
    setEmployee(true);
  };
  const openTravels = () => {
    setTravels(true);
  };
  const openTransport = () => {
    setTransport(true);
  };
  useEffect(() => {
    Agency();
  }, [office, employee]);

  if (data) return (
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
            <Card
              title={`Agregar un transporte`}
              onHandle={openTransport}
              icon={`bx bx-lock`}
            />
          </div>
          <div className={styles.agencies}>
            <div className={styles.title}>
              <h2>Lista de Oficinas</h2>
            </div>
           {data?.employees?.items && <TableOffices rows={data?.officies?.items}/>}
          </div>
          <div className={styles.users}>
            <div className={styles.title}>
              <h2>Lista de Empleados</h2>
            </div>
            {data?.employees?.items && <TableEmployees rows={data?.employees?.items}/>}
          </div>
          <ModalOffice open={office} close={() => setOffice(!office)} />
          {data?.officies?.items && <ModalEmployee offices={data?.officies?.items} open={employee} close={() => setEmployee(!employee)} />}
          {data?.officies?.items[0] && <ModalTravel offices={data?.officies?.items[0]} open={travels} close={() => setTravels(!travels)} />}
          {data?.officies?.items && <ModalTransport offices={data?.officies?.items} open={transport} close={() => setTransport(!transport)} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
