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
import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import TableOrderDetails from "@/components/TableOrderDetails";
import TableTravels from "@/components/TableTravels";
import ModalAgency from "@/components/ModalAgency";

const Dashboard = () => {
  const [agencySubs, setAgencySubs] = useState([]);
  const [agencyBookings, setAgencyBookings] = useState([]);
  const [agenciesList, setAgenciesList] = useState([]);
  const [agencyOrders, setAgencyOrders] = useState([]);
  const [agency, setAgency] = useState(null);
  const [travel, setTravel] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchAgencySubs = async () => {
    try {
      const result = await API.graphql({
        query: listAgencySubscriptions,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const list = await API.graphql({
        query: queries.listAgencies,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      setAgencySubs(result?.data?.listAgencySubscriptions?.items);
      setAgenciesList(list?.data?.listAgencies?.items);
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
      console.log(result?.data?.getAgency?.bookings?.items);
      const orders = await API.graphql({
        query: queries.listOrderDetails,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          filter: {
            bookingID: { eq: travel },
          },
        },
      });
      console.log("ORDERS", orders.data.listOrderDetails);
      setAgencyOrders(orders?.data?.listOrderDetails?.items);
    } catch (error) {
      console.log(error);
    }
  };
  const openModalAgency = () => {
    setOpen(true);
  };
  useEffect(() => {
    fetchAgencySubs();
    fetchAgency();
  }, [agency, travel]);

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
              <h2>Listado de Empresas Subscritas</h2>
              <IconButton
                aria-label="refresh-email"
                onClick={() => fetchAgencySubs()}
              >
                <RefreshIcon />
              </IconButton>
            </div>
            <TableEmailSubs rows={agenciesList} />
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
              <h2>Lista de Viajes por Empresa</h2>
            </div>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                // getOptionLabel={(option) => option.rif}
                isOptionEqualToValue={(option, value) =>
                  option.rif === value.rif
                }
                options={agenciesList}
                value={agency}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <div
                      onClick={() => {
                        setAgency(option.id);
                      }}
                    >{`Nombre: ${option.name} - RIF: ${option.rif}`}</div>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Busqueda por agencia" />
                )}
              />
            </FormControl>
            {agencyBookings.length !== 0 ? (
              <TableTravels rows={agencyBookings} />
            ) : (
              <div className={styles.nothingTable}>
                Selecciona una empresa para poder ver sus viajes
              </div>
            )}
            <div className={styles.title}>
              <h2>Lista de Ordenes de Venta por Viajes</h2>
            </div>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                // getOptionLabel={(option) => option.id}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={agencyBookings}
                value={travel}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <div
                      onClick={() => {
                        setTravel(option.id);
                        fetchAgency();
                      }}
                    >{`${option.departure.city}, ${option.departure.state} - ${option.arrival.city}, ${option.arrival.state} - ${option.departure.date}`}</div>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Busqueda por ID del viaje" />
                )}
              />
            </FormControl>
            {agencyBookings.length !== 0 ? (
              <TableOrderDetails rows={agencyOrders} />
            ) : (
              <div className={styles.nothingTable}>
                No tienes ordenes para ver en esta empresa
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
