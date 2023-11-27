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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TableOrderDetails from "../TableOrderDetails";

const Dashboard = ({ dataResult, userType }) => {
  const [travels, setTravels] = useState(false);
  const [travel, setTravel] = useState('');
  const [transport, setTransport] = useState(false);
  const [data, setData] = useState(dataResult);
  const [dataTravels, setDataTravels] = useState([]);
  const [dataOrders, setDataOrders] = useState([]);
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
    // console.log(list?.data);
    setData(list?.data?.getEmployee);
    const travels = await API.graphql({
      query: queries.listBookings,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: list?.data?.getEmployee?.agencyID,
      },
    });
    // console.log(travels?.data.listBookings.items);
    setDataTravels(travels?.data.listBookings.items);
  };

  const Travels = async () => {
    const list = await API.graphql({
      query: queries.listOrderDetails,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        bookingID: travel,
      },
    });
    console.log(list.data.listOrderDetails);
    setDataOrders(list.data.listOrderDetails.items)
  };

  useEffect(() => {
    if (!travels || !transport) Employee();
    if (travel) Travels()
  }, [transport, travels, travel]);

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
          {dataTravels && <TableTravels rows={dataTravels} />}
        </div>
          <div className={styles.agencies}>
          <div className={styles.title}>
            <h2>Lista de Ordenes de Venta</h2>
          </div>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Seleccionar viaje</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={travel}
            label="Seleccionar viaje"
            onChange={(e) => setTravel(e.target.value)}
          >
            {dataTravels.map((item, index) => (
            <MenuItem key={index} value={item.id}>{`ID: ${item.id} - Salida: ${item.departureCity} - ${item.departure.date} - Llegada: ${item.arrivalCity} - ${item.arrival.date}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
          {travel ? <TableOrderDetails rows={dataOrders} /> : (
            <div className={styles.nothingTable}>
              Selecciona un viaje antes para poder ver sus ordenes de venta
            </div>
          )}
        </div>
        
        <ModalTravel
          offices={data?.office}
          open={travels}
          close={() => setTravels(!travels)}
        />

      </div>
    </div>
  );
};

export default Dashboard;