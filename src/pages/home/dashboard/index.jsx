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
  const [listCSV, setListCSV] = useState(null);
  const [listCSVExtended, setListCSVExtended] = useState(null);
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
      // console.log(result?.data?.getAgency?.bookings?.items);
      const orders = await API.graphql({
        query: queries.listOrderDetails,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          filter: {
            bookingID: { eq: travel },
          },
        },
      });
      // console.log("ORDERS", orders.data.listOrderDetails);
      setAgencyOrders(orders?.data?.listOrderDetails?.items);
    } catch (error) {
      console.log(error);
    }
  };
  const openModalAgency = () => {
    setOpen(true);
  };
  const fetchCSV = async () => {
    try {
      const result = await API.graphql({
        query: queries.listAgenciesCSV,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      // console.log("LISTA", result?.data?.listAgencies);
      const orders = await API.graphql({
        query: queries.listOrdersCSV,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      // console.log("ORDERS", orders?.data?.listOrderDetails);
      setListCSV({
        listAgencies: result?.data?.listAgencies?.items,
        listOrdersDetails: orders?.data?.listOrderDetails?.items,
      });
    } catch (error) {
      console.log("aqui csv", error);
    }
  };
  const resumenSimple = () => {
    let listAgencies = listCSV?.listAgencies;
    let listOrders = listCSV?.listOrdersDetails;

    listAgencies = listAgencies.map((agency) => {
      agency.bookings.items = agency.bookings.items.map((booking) => {
        booking.orders = listOrders.filter(
          (order) => order.bookingID === booking.id
        );
        return booking;
      });
      return agency;
    });

    let newArray = listAgencies.map((item, index) => {
      return {
        ID_Empresa: item.id,
        Fecha_Creacion: item.createdAt,
        Nombre: item.name,
        RIF: item.rif,
        Telefono: item.phone,
        Correo_Electronico: item.email,
        Estatus: item.status,
        Cantidad_Oficinas: item.officies.items.length,
        Cantidad_Empleados: item.employees.items.length,
        Cantidad_Viajes: item.bookings.items.length,
        Porcentaje: item.percentage,
      };
    });
    let cabecera = Object.keys(newArray[0]).join(",") + "\r\n";

    let cuerpo = newArray
      .map((obj) => Object.values(obj).join(","))
      .join("\r\n");
    let csv = cabecera + cuerpo;

    let enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    enlaceDescarga.target = "_blank";
    enlaceDescarga.download = "resumen_simple_bybus.csv";
    enlaceDescarga.click();
    console.log(newArray);
  };

  const resumenDetallado = () => {
    let listAgencies = listCSV?.listAgencies;
    let listOrders = listCSV?.listOrdersDetails;

    let allTickets = [];
    let allCustomers = [];
    let allBookings = [];
    let allOrders = [];
    let allEmployees = [];
    let allOfficies = [];
    let allHistory = [];

    // listAgencies.forEach((agency) => {
    //   agency.bookings.items.forEach((booking) => {
    //     let orders = listOrders.filter(
    //       (order) => order.bookingID === booking.id
    //     );
    //     orders.forEach((order) => {
    //       allOrders.push({ agency: agency, booking: booking, order: order });
    //     });
    //   });
    // });

    listAgencies.forEach((agency) => {
      agency.bookings.items.forEach((booking) => {
        if (Array.isArray(booking.tickets.items)) {
          booking.tickets.items.map((item) =>
            allTickets.push({ booking: booking, agency: agency, ticket: item })
          );
        }
        if (Array.isArray(booking.customers.items)) {
          booking.customers.items.map((item) =>
            allCustomers.push({
              booking: booking,
              agency: agency,
              customer: item,
            })
          );
        }
        allBookings.push(booking);
      });
      if (Array.isArray(agency.employees.items)) {
        agency.employees.items.map((item) =>
          allEmployees.push({ agency: agency, employee: item })
        );
      }
      if (Array.isArray(agency.officies.items)) {
        agency.officies.items.map((item) =>
          allOfficies.push({ agency: agency, office: item })
        );
      }
      if (Array.isArray(agency.history.items)) {
        agency.history.items.map((item) =>
          allHistory.push({ agency: agency, history: item })
        );
      }
    });


    listAgencies = listAgencies.map((item, index) => {
      return {
        ID_Empresa: item.id,
        Fecha_Creacion: item.createdAt,
        Nombre: item.name,
        RIF: item.rif,
        Telefono: item.phone,
        Correo_Electronico: item.email,
        Estatus: item.status,
        Cantidad_Oficinas: item.officies.items.length,
        Cantidad_Empleados: item.employees.items.length,
        Cantidad_Viajes: item.bookings.items.length,
        Historial: item.history.items.length,
        Porcentaje: item.percentage,
      };
    });
    allBookings = allBookings.map((item, index) => {
      return {
        ID_Empresa: item.agency.id,
        ID_Empleado: item.createdBy,
        ID_Oficina: item.officeID,
        ID_Viaje: item.id,
        Nombre_Empresa: item.agency.name,
        RIF_Empresa: item.agency.rif,
        Telefono_Empresa: item.agency.phone,
        Correo_Electronico_Empresa: item.agency.email,
        Estatus_Empresa: item.agency.status,
        Porcentaje_Empresa: item.agency.percentage,
        Fecha_Creacion_Viaje: item.createdAt,
        Codigo_Viaje: item.code,
        Conductor_Viaje: item.driver,
        Precio_Viaje: item.price,
        Porcentaje_Viaje: item.percentage,
        Estatus_Viaje: item.status,
        Tipo_Bus: item.transport,
        Stock_Disponible: item.stock,
        Cantidad_Tickets: item.tickets.items.length,
        Estado_Salida: item.departure.state,
        Ciudad_Salida: item.departure.city,
        Fecha_Salida: item.departure.date,
        Hora_Salida: item.departure.time,
        Estado_Llegada: item.arrival.state,
        Ciudad_Llegada: item.arrival.city,
        Fecha_Llegada: item.arrival.date,
        Hora_Llegada: item.arrival.time,
      };
    });

    allEmployees = allEmployees.map((item, index) => {
      return {
        ID_Empresa: item.agency.id,
        ID_Empleado: item.employee.id,
        ID_Oficina: item.employee.officeID,
        Nombre_Empresa: item.agency.name,
        RIF_Empresa: item.agency.rif,
        Telefono_Empresa: item.agency.phone,
        Correo_Electronico_Empresa: item.agency.email,
        Estatus_Empresa: item.agency.status,
        Porcentaje_Empresa: item.agency.percentage,
        Nombre_Empleado: item.employee.name,
        Correo_Electronico_Empleado: item.employee.email,
        Telefono_Empleado: item.employee.phone,
        Estatus_Empleado: item.employee.status,
        Tipo_Empleado: item.employee.type,
      };
    });

    allHistory = allHistory.map((item, index) => {
      return {
        ID_Empresa: item.agency.id,
        ID_Historial: item.history.id,
        Nombre_Empresa: item.agency.name,
        RIF_Empresa: item.agency.rif,
        Telefono_Empresa: item.agency.phone,
        Correo_Electronico_Empresa: item.agency.email,
        Estatus_Empresa: item.agency.status,
        Porcentaje_Empresa: item.agency.percentage,
        Fecha_Historial: item.history.createdAt,
        Descripcion_Historial: item.history.description,
        Razon_Historial: item.history.reason,
      };
    });

    allOfficies = allOfficies.map((item, index) => {
      return {
        ID_Empresa: item.agency.id,
        ID_Oficina: item.office.id,
        Nombre_Empresa: item.agency.name,
        RIF_Empresa: item.agency.rif,
        Telefono_Empresa: item.agency.phone,
        Correo_Electronico_Empresa: item.agency.email,
        Estatus_Empresa: item.agency.status,
        Porcentaje_Empresa: item.agency.percentage,
        Nombre_Oficina: item.office.name,
        Correo_Electronico_Oficina: item.office.email,
        Telefono_Oficina: item.office.phone,
        Estado_Oficina: item.office.state,
        Ciudad_Oficina: item.office.city,
        Direccion_Oficina: item.office.address,
        Estatus_Oficina: item.office.status,
        Fecha_Creacion_Oficina: item.office.createdAt,
      };
    });

    allOrders = allOrders.map((item, index) => {
      return {
        ID_Empresa: item.agency.id,
        ID_Oficina: item.booking.officeID,
        ID_Empleado: item.booking.createdBy,
        ID_Viaje: item.booking.id,
        ID_Orden_Venta: item.order.id,
        ID_Cliente: item.order.userID,
        ID_Pago: item.order.paymentID,
        Nombre_Empresa: item.agency.name,
        RIF_Empresa: item.agency.rif,
        Telefono_Empresa: item.agency.phone,
        Correo_Electronico_Empresa: item.agency.email,
        Estatus_Empresa: item.agency.status,
        Porcentaje_Empresa: item.agency.percentage,
        Fecha_Creacion_Viaje: item.booking.createdAt,
        Codigo_Viaje: item.booking.code,
        Conductor_Viaje: item.booking.driver,
        Precio_Viaje: item.booking.price,
        Porcentaje_Viaje: item.booking.percentage,
        Estatus_Viaje: item.booking.status,
        Tipo_Bus: item.booking.transport,
        Stock_Disponible: item.booking.stock,
        Cantidad_Tickets: item.booking.tickets.items.length,
        Estado_Salida: item.booking.departure.state,
        Ciudad_Salida: item.booking.departure.city,
        Fecha_Salida: item.booking.departure.date,
        Hora_Salida: item.booking.departure.time,
        Estado_Llegada: item.booking.arrival.state,
        Ciudad_Llegada: item.booking.arrival.city,
        Fecha_Llegada: item.booking.arrival.date,
        Hora_Llegada: item.booking.arrival.time,
        Orden_Venta_Fecha_Creacion: item.order.createdAt,
        Orden_Venta_Cantidad_Tickets: item.order.amount,
        Orden_Venta_Monto_Total: item.order.total,
        Orden_Venta_Correo_Electronico: item.order.customerEmail,
        Orden_Venta_Nombre: item.order.customerName,
        Orden_Venta_Estatus: item.order.status,
        Orden_Venta_Tipo_Pago: item.order.paymentMethod,
        Orden_Venta_Referencia: item.order?.payment?.reference,
      };
    });

    allTickets = allTickets.map((item, index) => {
      return {
        ID_Empresa: item.agency.id,
        ID_Oficina: item.booking.officeID,
        ID_Empleado: item.booking.createdBy,
        ID_Viaje: item.booking.id,
        ID_Orden_Venta: item.ticket.orderDetailID,
        ID_Cliente: item.ticket.customerID,
        Nombre_Empresa: item.agency.name,
        RIF_Empresa: item.agency.rif,
        Telefono_Empresa: item.agency.phone,
        Correo_Electronico_Empresa: item.agency.email,
        Estatus_Empresa: item.agency.status,
        Porcentaje_Empresa: item.agency.percentage,
        Fecha_Creacion_Viaje: item.booking.createdAt,
        Codigo_Viaje: item.booking.code,
        Conductor_Viaje: item.booking.driver,
        Precio_Viaje: item.booking.price,
        Porcentaje_Viaje: item.booking.percentage,
        Estatus_Viaje: item.booking.status,
        Tipo_Bus: item.booking.transport,
        Stock_Disponible: item.booking.stock,
        Cantidad_Tickets: item.booking.tickets.items.length,
        Estado_Salida: item.booking.departure.state,
        Ciudad_Salida: item.booking.departure.city,
        Fecha_Salida: item.booking.departure.date,
        Hora_Salida: item.booking.departure.time,
        Estado_Llegada: item.booking.arrival.state,
        Ciudad_Llegada: item.booking.arrival.city,
        Fecha_Llegada: item.booking.arrival.date,
        Hora_Llegada: item.booking.arrival.time,
        Fecha_Creacion_Ticket: item.ticket.createdAt,
        Codigo_Ticket: item.ticket.code,
        Estatus_Ticket: item.ticket.status,
      };
    });

    console.log("nuevo nuevo list", {
      listAgencies: listAgencies,
      listOfficies: allOfficies,
      listEmployees: allEmployees,
      listBookings: allBookings,
      listTickets: allTickets,
      listCustomers: allCustomers,
      listHistory: allHistory,
      listOrders: allOrders,
    });
    const JSZip = require("jszip");
    const saveAs = require("file-saver");

    let arrays = [
      listAgencies,
      allOfficies,
      allEmployees,
      allBookings,
      allTickets,
      allCustomers,
      allHistory,
      allOrders,
    ];

    let zip = new JSZip();

    arrays.forEach((arr, i) => {
      let csv = arr
        .map((row) => {
          // Si row es un objeto, convertirlo en un array
          if (typeof row === "object" && row !== null) {
            return Object.values(row).join(",");
          }
          // Si row es un array, usarlo tal cual
          else if (Array.isArray(row)) {
            return row.join(",");
          }
          // Si row no es un objeto ni un array, convertirlo en un string
          else {
            return String(row);
          }
        })
        .join("\n");
      zip.file(
        `resumen_${
          i === 0
            ? "empresas"
            : i === 1
            ? "oficinas"
            : i === 2
            ? "empelados"
            : i === 3
            ? "viajes"
            : i === 4
            ? "tickets"
            : i === 5
            ? "clientes"
            : i === 6
            ? "historial"
            : "ordenes"
        }.csv`,
        csv
      );
    });

    zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs.saveAs(blob, "resumen_detallado_bybus.zip");
    });
    // return;
  };
  useEffect(() => {
    fetchAgencySubs();
    fetchAgency();
    fetchCSV();
    // console.log(listCSV);
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
            <Card
              title={`Descargar resumen simple`}
              onHandle={resumenSimple}
              icon={`bx bxs-file-import`}
            />
            <Card
              title={`Descargar resumen detallado`}
              onHandle={resumenDetallado}
              icon={`bx bxs-file-archive`}
            />
          </div>
          <div className={styles.users}>
            <div className={styles.title}>
              <h2 style={{
                fontWeight: 700
              }}>Listado de empresas suscritas</h2>
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
              <h2 style={{
                fontWeight: 700
              }}>Listado de Peticion de Subscripcion de Agencias</h2>
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
              <h2 style={{
                fontWeight: 700
              }}>Lista de Viajes por Empresa</h2>
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
              <TableTravels
                rows={agencyBookings.sort(
                  (a, b) =>
                    new Date(a.departure.date) - new Date(b.departure.date)
                )}
              />
            ) : (
              <div className={styles.nothingTable}>
                Selecciona una empresa para poder ver sus viajes
              </div>
            )}
            <div className={styles.title}>
              <h2 style={{
                fontWeight: 700
              }}>Lista de Ordenes de Venta por Viajes</h2>
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
