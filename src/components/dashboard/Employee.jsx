import React, { useEffect, useState } from "react";
import styles from "@/styles/Dashboard.module.css";
import Card from "@/components/Card";
import ModalTransportEmployee from "@/components/ModalTransportEmployee";
import ModalTravel from "@/components/ModalTravel";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "@/graphql/custom/queries/home";
import * as subscriptions from "@/graphql/custom/subscriptions/home";
import TableEmployees from "@/components/TableEmployees";
import TableOffices from "@/components/TableOffices";
import TableTravels from "../TableTravels";

const Dashboard = ({ dataResult, userType }) => {
  const [travels, setTravels] = useState(false);
  const [transport, setTransport] = useState(false);
  const [data, setData] = useState(dataResult);
  const [dataTravels, setDataTravels] = useState([]);
  const [userT, setUserT] = useState(userType);

  const openTravels = () => {
    setTravels(true);
  };
  const openTransport = () => {
    setTransport(true);
  };
  const Employee = async () => {
    const user = await Auth.currentAuthenticatedUser({});
    const list = await API.graphql({
      query: queries.getEmployee,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: dataResult?.id,
      },
    });
    console.log(list?.data) 
    setData(list?.data?.getEmployee);
    const travels = await API.graphql({
      query: queries.listBookings,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: list?.data?.getEmployee?.agencyID,
      },
    });
    console.log(travels?.data.listBookings.items) 
    setDataTravels(travels?.data.listBookings.items)
  };
  useEffect(() => {
    if (!travels || !transport) Employee();
  }, [transport, travels]);

  return (
    <div className={styles.section}>
      <div className={styles.pages}>
        <div className={styles.panel}>
          {userT === "employee" && (
            <>
              <Card
                title={`Agregar una nuevo viaje`}
                onHandle={openTravels}
                icon={`bx bx-calendar-plus`}
              />
              {/* <Card
                title={`Agregar un nuevo transporte`}
                onHandle={openTransport}
                icon={`bx bxs-bus`}
              /> */}
            </>
          )}
        </div>
        <div className={styles.agencies}>
          <div className={styles.title}>
            <h2>Lista de Viajes</h2>
          </div>
          {dataTravels && (
            <TableTravels rows={dataTravels} />
          )}
        </div>
        {/* <div className={styles.users}>
            <div className={styles.title}>
              <h2>Lista de Empleados</h2>
            </div>
            {data?.employees?.items && (
              <TableEmployees rows={data?.employees?.items} />
            )}
          </div> */}
          <ModalTravel
            offices={data?.office}
            open={travels}
            close={() => setTravels(!travels)}
          />

        {/* <ModalTransportEmployee
          office={data?.office}
          open={transport}
          close={() => setTransport(!transport)}
        /> */}
      </div>
    </div>
  );
};

export default Dashboard;
