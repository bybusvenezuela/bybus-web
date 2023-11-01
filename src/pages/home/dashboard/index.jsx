import React, { useState, useEffect } from "react";
import Menu from "@/components/Menu";
import styles from "@/styles/Dashboard.module.css";
import TableAgenciesSubs from "@/components/TableAgenciesSubs";
import TableEmailSubs from "@/components/TableEmailSubs";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "@/components/Card";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import { Auth, API } from "aws-amplify";
import {
  listEmailSusbcriptions,
  listAgencySubscriptions,
  listAgencies,
} from "@/graphql/queries";
import * as queries from "@/graphql/custom/queries";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TableOrderDetails from "@/components/TableOrderDetails";
import TableTravels from "@/components/TableTravels";
import ModalAgency from "@/components/ModalAgency";

const Dashboard = () => {
  const [emailSubs, setEmailSubs] = useState([]);
  const [agencySubs, setAgencySubs] = useState([]);
  const [agencyBookings, setAgencyBookings] = useState([]);
  const [agencyOrders, setAgencyOrders] = useState([]);
  const [agency, setAgency] = useState("");
  const [open, setOpen] = useState(false);
  const fetchEmailSubs = async () => {
    try {
      const result = await API.graphql({
        query: listEmailSusbcriptions,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      setEmailSubs(result?.data?.listEmailSusbcriptions?.items);
    } catch (error) {
      setEmailSubs([]);
      console.error("ERROR AL CONSULTAR EMAIL SUBS: ", error);
    }
  };
  const fetchAgencySubs = async () => {
    try {
      const result = await API.graphql({
        query: listAgencySubscriptions,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      setAgencySubs(result?.data?.listAgencySubscriptions?.items);
    } catch (error) {
      setAgencySubs([]);
      console.error("ERROR AL CONSULTAR AGENCIAS SUBS: ", error);
    }
  };

  /*  */
  const fetchAgency = async () => {
    try {
      const result = await API.graphql({
        query: queries.getAgency,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          id: agency,
        },
      });
      setAgencyBookings(result?.data?.getAgency?.bookings?.items);

      let arrayOrders = [];

      const promises = result?.data?.getAgency?.bookings?.items?.map(
        async (item, index) => {
          const orders = await API.graphql({
            query: queries.listOrderDetails,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              filter: {
                bookingID: { eq: item.id },
              },
            },
          });
          if (orders?.data?.listOrderDetails?.items.length !== 0) {
            orders?.data?.listOrderDetails?.items.map((item, index) => {
              arrayOrders.push(item);
            });
          }
        }
      );

      Promise.all(promises).then(() => {
        console.log(arrayOrders);
        setAgencyOrders(arrayOrders);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const openModalAgency = () => {
    setOpen(true);
  };
  useEffect(() => {
    fetchEmailSubs();
    fetchAgencySubs();
    if (agency) fetchAgency();
  }, [agency]);

  return (
    <div className={styles.content}>
      <Menu />
      <div className="container section">
        <div className={styles.pages}>
          <div className={styles.panel}>
            <Card
              title={`Agregar nueva agencia`}
              onHandle={openModalAgency}
              icon={`bx bx-store`}
            />
          </div>
          <div className={styles.users}>
            <div className={styles.title}>
              <h2>Listado de Correos Subscritos</h2>
              <IconButton
                aria-label="refresh-email"
                onClick={() => fetchEmailSubs()}
              >
                <RefreshIcon />
              </IconButton>
            </div>
            <TableEmailSubs rows={emailSubs} />
          </div>
          <div className={styles.users}>
            <div className={styles.title}>
              <h2>Listado de Peticion de Subscripcion de Agencias</h2>
              <IconButton
                aria-label="refresh-agency"
                onClick={() => fetchAgencySubs()}
              >
                <RefreshIcon />
              </IconButton>
            </div>
            <TableAgenciesSubs rows={agencySubs} />
          </div>

          {/*  */}
          <div className={styles.agencies}>
            <div className={styles.title}>
              <h2>Lista de Viajes de Venta por Agencia</h2>
            </div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Seleccionar agencia
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={agency}
                label="Seleccionar agencia"
                onChange={(e) => setAgency(e.target.value)}
              >
                {agencySubs.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.agencyID}
                  >{`Nombre: ${item.name} - RIF: ${item.rif}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {agencyBookings.length !== 0 ? (
              <TableTravels rows={agencyBookings} />
            ) : (
              <div className={styles.nothingTable}>
                Selecciona una agencia para poder ver sus viajes
              </div>
            )}
            {agencyBookings.length !== 0 ? (
              <TableOrderDetails rows={agencyOrders} />
            ) : (
              <div className={styles.nothingTable}>
                No tienes ordenes para ver en esta agencia
              </div>
            )}
          </div>

          <ModalAgency
            open={open}
            close={() => {
              setOpen(!open);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
