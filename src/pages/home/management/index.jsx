import Menu from "@/components/Menu";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Management.module.css";
import { Button, TextField } from "@mui/material";
import * as queries from "@/graphql/custom/queries";
import * as mutation from "@/graphql/custom/mutations";
import { Auth, API } from "aws-amplify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TableAgenciesManagement from "@/components/TableAgenciesManagement";

const Management = () => {
  const [business, setBusiness] = useState("");
  const [description, setDescription] = useState("");
  const [tasa, setTasa] = useState(0);
  const [dateInput, setDateInput] = useState(null);
  const [filterTickets, setFilterTickets] = useState([]);
  const [data, setData] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [total, setTotal] = useState(0);
  const [deuda, setDeuda] = useState(true);

  const formatearFecha = (fecha) => {
    let año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan desde 0
    let dia = fecha.getDate();

    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;

    return año + "-" + mes + "-" + dia;
  };
  const fetchSearch = async () => {
    setDescription("");
    setDeuda(true);
    setData(null)
    console.log('toy aqui cabron', filterTickets)
    let newFilterTickets = [];
    let newTotal = 0
    try {
      if (business) {
        const result = await API.graphql({
          query: queries.listAgencies,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            filter: {
              id: { eq: business },
            },
          },
        });
        console.log(result.data.listAgencies.items[0]);
        setData(result.data.listAgencies.items[0]);
        result.data.listAgencies.items[0].history.items.map((item, index) => {
          let coincidencia = item.reason.match(/\[(.*?)\]/);
          let fecha = coincidencia ? coincidencia[1] : null;
          if (fecha === dateInput) setDeuda(false);
        });
        let filterBookings =
          result.data.listAgencies.items[0].bookings.items.filter(
            (item, index) => item.status !== "CANCELLED"
          );
        filterBookings.map((booking, index1) => {
          booking.tickets.items.map((ticket, index2) => {
            let fechaFormateada = formatearFecha(new Date(ticket?.updatedAt));
            if (ticket.status === "BOARDED" && fechaFormateada === dateInput) {
              newFilterTickets.push({ ticket: ticket, booking: booking });
              newTotal += booking.price; 
            }
          });
        });
      } else {
        const result = await API.graphql({
          query: queries.listAgencies,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          // variables: {
          // },
        });
        let filter = result.data.listAgencies.items.filter(
          (item, index) => item.status === "ACTIVO"
        );
        console.log(filter);
        setDataList(filter);
      }
      setFilterTickets(newFilterTickets);
      setTotal(newTotal);

    } catch (error) {
      console.error(error);
    }
  };

  const deudaHistory = async () => {
    let opcion = confirm(
      'Recuerda de haber pagado el monto correspondiente a la empresa antes de realizar de confirmar. Si hiciste todos los procedimientos puedes pulsar "Aceptar"'
    );
    let des = description;
    try {
      if (opcion) {
        const result = await API.graphql({
          query: mutation.createAgencyHistory,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: {
              agencyID: data.id,
              reason: `DEUDA_PAGADA[${dateInput}]`,
              description: des,
            },
          },
        });
        console.log(result);
        setData(null);
        setFilterTickets([]);
        setDescription("");
        setBusiness("");
        setDeuda(true);
        setTotal(0);
        alert("Tu registro de confirmacion ha sido un exito!");
      } else {
        alert(
          "No se ha podido completar el registro de la confirmacion de tu pago"
        );
      }
    } catch (error) {
      alert(
        "No se ha podido completar el registro de la confirmacion de tu pago"
      );
      console.log(error);
    }
  };

  const resumenSimple = () => {
    let newArray = filterTickets.map((item, index) => {
      return {
        ID_Viaje: item.booking.id,
        ID_Ticket: item.ticket.id,
        Codigo_Pasajero: item.ticket.code,
        Precio: item.booking.price,
        Estado_Salida: item.booking.departure.state,
        Ciudad_Salida: item.booking.departure.city,
        Fecha_Salida: item.booking.departure.date,
        Hora_Salida: item.booking.departure.time,
        Estado_Llegada: item.booking.arrival.state,
        Ciudad_Salida: item.booking.arrival.city,
        Fecha_Salida: item.booking.arrival.date,
        Hora_Salida: item.booking.arrival.time,
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
    enlaceDescarga.download = "resumen_simple.csv";
    enlaceDescarga.click();
    console.log(newArray);
  };

  const resumenDetallado = () => {
    let newArray = filterTickets.map((item, index) => {
      return {
        ID_Empresa: item.booking.agencyID,
        ID_Oficina: item.booking.officeID,
        ID_Empleado: item.booking.createdBy,
        ID_Viaje: item.booking.id,
        ID_Ticket: item.ticket.id,
        ID_Orden_Venta: item.ticket.orderDetailID,
        ID_Cliente: item.ticket.customerID,
        Codigo_Viaje: item.booking.code,
        Codigo_Pasajero: item.ticket.code,
        Precio: item.booking.price,
        Conductor: item.booking.driver,
        Tipo_Bus: item.booking.transport,
        Estado_Salida: item.booking.departure.state,
        Ciudad_Salida: item.booking.departure.city,
        Fecha_Salida: item.booking.departure.date,
        Hora_Salida: item.booking.departure.time,
        Estado_Llegada: item.booking.arrival.state,
        Ciudad_Salida: item.booking.arrival.city,
        Fecha_Salida: item.booking.arrival.date,
        Hora_Salida: item.booking.arrival.time,
        Estatus_Viaje: item.booking.status,
        Porcentaje_Viaje: item.booking.percentage,
        Stock_Disponible: item.booking.stock,
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
    enlaceDescarga.download = "resumen_detallado.csv";
    enlaceDescarga.click();
    console.log(newArray);
  };

  useEffect(() => {
    let hoy = formatearFecha(new Date());
    setDateInput(hoy);
  }, []);

  if (dateInput)
    return (
      <div className={styles.content}>
        <Menu />
        <div className="container section">
          <div className={styles.up}>
            <h1>Gestion de pagos</h1>
            <div>
              Introduce el numero de la empresa para poder verificar la
              informacion y gestionar su pago
            </div>
            <div className={styles.search}>
              <TextField
                fullWidth
                id="outlined-basic"
                value={business}
                label="N° de id de la empresa"
                variant="outlined"
                onChange={(e) => setBusiness(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha"
                  format="D/M/YYYY"
                  defaultValue={dayjs(dateInput)}
                  slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                  sx={{ marginLeft: 1, width: 320 }}
                  onChange={(e) => {
                    let fecha = formatearFecha(new Date(e));
                    console.log(fecha);
                    setDateInput(fecha);
                  }}
                />
              </LocalizationProvider>
              <Button
                variant="contained"
                sx={{
                  height: 55,
                  width: 200,
                  marginLeft: 3,
                }}
                onClick={() => fetchSearch()}
              >
                Buscar
              </Button>
            </div>
            {data && (
              <div className={styles.info}>
                <div className={styles.both}>
                  <div className={styles.infoAgency}>
                    <h3>Informacion de la empresa</h3>
                    <p>
                      <span>Nombre:</span> {data?.name}
                    </p>
                    <p>
                      <span>RIF:</span> {data?.rif}
                    </p>
                    <p>
                      <span>Correo electronico:</span> {data?.email}
                    </p>
                    <p>
                      <span>Telefono:</span> {data?.phone}
                    </p>
                  </div>
                  <div className={styles.infoTravel}>
                    <h3>Resumen de deuda ({dateInput})</h3>
                    <div className={styles.both}>
                      <div>
                        <p>
                          {" "}
                          <span>Total tickets abordados:</span>{" "}
                          {filterTickets.length}
                        </p>
                        <p>
                          {" "}
                          {console.log(filterTickets)}
                          <span>Total ha pagar:</span> {total}$
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.button}>
                  <Button
                    variant="contained"
                    // color="error"
                    sx={{
                      height: 55,
                      width: 250,
                      marginLeft: 3,
                    }}
                    onClick={resumenSimple}
                  >
                    Resumen simple
                  </Button>
                  <Button
                    variant="contained"
                    // color="error"
                    sx={{
                      height: 55,
                      width: 250,
                      marginLeft: 3,
                    }}
                    onClick={resumenDetallado}
                  >
                    Resumen detallado
                  </Button>
                  {deuda && filterTickets.length !== 0 ? (
                    <div
                      style={{
                        marginLeft: 25,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <textarea
                        name=""
                        id=""
                        cols="10"
                        rows="6"
                        placeholder="Coloca informacion sobre el pago o cualquier cosa que quieras describir"
                        style={{
                          padding: 5,
                          outline: "none",
                        }}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          marginTop: 1,
                          height: 55,
                          width: 250,
                        }}
                        onClick={deudaHistory}
                      >
                        Deuda sin pagar
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outlined"
                      // color="error"
                      sx={{
                        marginTop: 1,
                        height: 55,
                        width: 250,
                        marginLeft: 2.8,
                      }}
                      // onClick={deudaHistory}
                    >
                      Sin pagos pendientes
                    </Button>
                  )}
                </div>
              </div>
            )}
            {dataList.length !== 0 && <TableAgenciesManagement rows={dataList} />}
          </div>
        </div>
      </div>
    );
};

export default Management;
