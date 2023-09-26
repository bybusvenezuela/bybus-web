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

const Dashboard = ({ dataResult, userType }) => {
  const [travels, setTravels] = useState(false);
  const [transport, setTransport] = useState(false);
  const [data, setData] = useState(dataResult);
  const [userT, setUserT] = useState(userType);

  const openTravels = () => {
    setTravels(true);
  };
  const openTransport = () => {
    setTransport(true);
  };
  useEffect(() => {
    if (!travels || !transport) Employee();
  }, [transport, travels]);

  const Employee = async () => {
    const user = await Auth.currentAuthenticatedUser({});
    const list = await API.graphql({
      query: queries.getEmployee,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: dataResult?.id,
      },
    });
    console.log("EMPLOEES: ", list?.data?.getEmployee);
    setData(list?.data?.getEmployee);
  };

  return (
    <div className={styles.section}>
      <div className={styles.pages}>
        <div className={styles.panel}>
          {userT === "employee" && (
            <>
              <Card
                title={`Agregar una nuevo Viaje`}
                onHandle={openTravels}
                icon={`bx bx-store`}
              />
              <Card
                title={`Agregar un nuevo Transporte`}
                onHandle={openTransport}
                icon={`bx bx-bus`}
              />
            </>
          )}
        </div>
        {data?.office?.transports.items.length > 0 && (
          <ModalTravel
            offices={data?.office}
            open={travels}
            close={() => setTravels(!travels)}
          />
        )}

        <ModalTransportEmployee
          office={data?.office}
          open={transport}
          close={() => setTransport(!transport)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
