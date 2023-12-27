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
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { useRouter } from "next/router";

const Management = () => {
  const router = useRouter().query;
  console.log("ROUTER", router);

  const [business, setBusiness] = useState("");
  const [description, setDescription] = useState("");
  const [tasa, setTasa] = useState(0);
  const [dateInput, setDateInput] = useState(null);
  const [dateInputSearch, setDateInputSearch] = useState(null);
  const [filterTickets, setFilterTickets] = useState([]);
  const [totalTicketsSell, setTotalTicketsSell] = useState([]);
  const [totalTicketsReturned, setTotalTicketsReturned] = useState([]);
  const [data, setData] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [listDaysTravels, setListDaysTravels] = useState([]);
  const [listMonthTravels, setListMonthTravels] = useState([]);
  const [listYearTravels, setListYearTravels] = useState([]);
  const [listDaysProfit, setListDaysProfit] = useState([]);
  const [listMonthProfit, setListMonthProfit] = useState([]);
  const [listYearProfit, setListYearProfit] = useState([]);
  const [listDaysReturned, setListDaysReturned] = useState([]);
  const [listMonthReturned, setListMonthReturned] = useState([]);
  const [listYearReturned, setListYearReturned] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalAll, setTotalAll] = useState(0);
  const [selectCharts, setSelectCharts] = useState(1);
  const [selectModeCharts, setSelectModeCharts] = useState(1);
  const [totalGanancias, setTotalGanancias] = useState(0);
  const [deuda, setDeuda] = useState(true);

  const formatearFecha = (fecha) => {
    let año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan desde 0
    let dia = fecha.getDate();

    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;

    return año + "-" + mes + "-" + dia;
  };
  const fetchSearch = async (businessId) => {
    console.log("businessid", businessId);
    setDescription("");
    setDeuda(true);
    setData(null);
    setDataList([]);
    console.log("toy aqui cabron", filterTickets);
    let newFilterTickets = [];
    let newTotal = 0;
    let totalTickets = [];
    let ticketsReturned = [];
    let totalProfit = 0;
    let totalTodo = 0;
    console.log("VOY AQUI");
    console.log(router.type !== "employee" ? router.id : "JEJE");
    console.log(
      businessId
        ? businessId
        : router.type !== "employee"
        ? business
        : router.offficeID
    );
    try {
      if (business || businessId) {
        console.log("TOY AQUI 2");

        let result;
        if (router.type === "owner") {
          const resultOwner = await API.graphql({
            query: queries.listOffices,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              filter: {
                agencyID: { eq: router.id },
                id: {
                  eq: businessId ? businessId : business,
                },
              },
            },
          });
          result = resultOwner;
        }
        if (router.type === "employee") {
          const resultEmployee = await API.graphql({
            query: queries.listOffices,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              id: router.offficeID,
            },
          });
          setData(result.data.listOffices.items[0]);
          result = resultEmployee;
        }

        // setData(result.data.listOffices.items[0]);
        result.data.listOffices.items[0].history.items.map((item, index) => {
          let coincidencia = item.reason.match(/\[(.*?)\]/);
          let fecha = coincidencia ? coincidencia[1] : null;
          if (fecha === dateInput) setDeuda(false);
        });
        let filterBookings =
          result.data.listOffices.items[0].bookings.items.filter(
            (item, index) => item.status !== "DISABLED"
          );
        filterBookings.map((booking, index1) => {
          booking.tickets.items.map((ticket, index2) => {
            let fechaFormateada = formatearFecha(new Date(ticket?.updatedAt));
            if (ticket.status === "BOARDED" && fechaFormateada === dateInput) {
              newFilterTickets.push({ ticket: ticket, booking: booking });
              newTotal += booking.price;
              setDateInputSearch(fechaFormateada);
            }
            if (ticket.status === "RETURNED" && fechaFormateada === dateInput) {
              ticketsReturned.push({ ticket: ticket, booking: booking });
              setDateInputSearch(fechaFormateada);
            }
            if (ticket.status !== "RETURNED" && fechaFormateada === dateInput) {
              totalTickets.push({ ticket: ticket, booking: booking });
              totalTodo += booking.price;
              setDateInputSearch(fechaFormateada);
            }
            if (ticket.status === "PAID" && fechaFormateada === dateInput) {
              totalProfit += booking.price;
              setDateInputSearch(fechaFormateada);
            }
          });
        });
        setDataList([]);
      } else {
        console.log("TOY AQUI");
        let result;
        if (router.type === "owner") {
          const resultOwner = await API.graphql({
            query: queries.listOffices,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              filter: {
                agencyID: { eq: router.id },
                id: {
                  eq: businessId ? businessId : business,
                },
              },
            },
          });
          result = resultOwner;
        }
        if (router.type === "employee") {
          const resultEmployee = await API.graphql({
            query: queries.listOffices,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              id: router.offficeID,
            },
          });
          setData(resultEmployee.data.listOffices.items[0]);
          result = resultEmployee;
        }
        console.log("RESULT", result.data.listAgencies);
        let filter = result.data.listOffices.items.filter(
          (item, index) => item.status === "ENABLED"
        );
        let array30Dias = [];
        let arrayMensual = [];
        let arrayAnual = [];

        let hoy = new Date();
        let hace30Dias = new Date();
        hace30Dias.setDate(hoy.getDate() - 30);
        let hace10Anos = new Date();
        hace10Anos.setFullYear(hoy.getFullYear() - 10);
        let nombresMeses = [
          "ene",
          "feb",
          "mar",
          "abr",
          "may",
          "jun",
          "jul",
          "ago",
          "sep",
          "oct",
          "nov",
          "dic",
        ];
        for (let i = 0; i < 30; i++) {
          let dia = new Date();
          dia.setDate(hoy.getDate() - i);
          let fecha = dia.toISOString().split("T")[0].substring(5); // Solo guarda el mes y el día
          array30Dias.push({ fecha: fecha, cantidad: 0 });
        }

        for (let i = 0; i < 12; i++) {
          let mes = new Date();
          mes.setMonth(i);
          arrayMensual.push({ mes: nombresMeses[mes.getMonth()], cantidad: 0 });
        }

        for (let i = 0; i < 10; i++) {
          let ano = new Date();
          ano.setFullYear(hoy.getFullYear() - i);
          arrayAnual.push({ ano: ano.getFullYear(), cantidad: 0 });
        }

        filter.forEach((objeto) => {
          if (Array.isArray(objeto.bookings.items)) {
            objeto.bookings.items.forEach((booking) => {
              let fechaDeparture = new Date(booking.departure.date);

              if (fechaDeparture >= hace30Dias && fechaDeparture <= hoy) {
                let diasPasados = Math.floor(
                  (hoy - fechaDeparture) / (1000 * 60 * 60 * 24)
                );
                array30Dias[diasPasados].cantidad++;
              }

              if (
                fechaDeparture.getFullYear() === hoy.getFullYear() &&
                fechaDeparture.getMonth() === hoy.getMonth() &&
                fechaDeparture <= hoy
              ) {
                arrayMensual[fechaDeparture.getMonth()].cantidad++;
              }

              if (
                fechaDeparture.getFullYear() >= hace10Anos.getFullYear() &&
                fechaDeparture <= hoy
              ) {
                arrayAnual[hoy.getFullYear() - fechaDeparture.getFullYear()]
                  .cantidad++;
              }
            });
          }
        });
        console.log(filter);

        /* GRAFICAS GANANCIAS */
        let filterBookings = filter.map((item, index) =>
          item.bookings.items.filter(
            (item, index) => item.status !== "CANCELLED"
          )
        );
        filterBookings = filterBookings.filter((item) => item.length > 0);
        filterBookings = filterBookings.flat();

        let array30DiasP = [];
        let arrayMensualP = [];
        let arrayAnualP = [];

        let hoyP = new Date();
        let hace30DiasP = new Date();
        hace30DiasP.setDate(hoyP.getDate() - 30);
        let hace10AnosP = new Date();
        hace10AnosP.setFullYear(hoyP.getFullYear() - 10);

        console.log(hoyP);
        console.log(hace30DiasP);
        console.log(hace10AnosP);
        for (let i = 0; i < 30; i++) {
          let diaP = new Date();
          diaP.setDate(hoyP.getDate() - i);
          let fechaP = diaP.toISOString().split("T")[0].substring(5); // Solo guarda el mes y el día
          array30DiasP.push({ fecha: fechaP, cantidad: 0, total: 0 });
        }

        for (let i = 0; i < 12; i++) {
          let mesP = new Date();
          mesP.setMonth(i);
          arrayMensualP.push({
            mes: nombresMeses[mesP.getMonth()],
            cantidad: 0,
            total: 0,
          });
        }

        for (let i = 0; i < 10; i++) {
          let anoP = new Date();
          anoP.setFullYear(hoyP.getFullYear() - i);
          arrayAnualP.push({ ano: anoP.getFullYear(), cantidad: 0, total: 0 });
        }

        filterBookings.forEach((booking) => {
          if (booking.tickets.items) {
            let ticketsPagados = booking.tickets.items.filter(
              (ticket) =>
                ticket.status === "PAID" && ticket.description !== "TAQUILLA"
            );
            let ticketsBoarded = booking.tickets.items.filter(
              (ticket) =>
                ticket.status === "BOARDED" && ticket.description !== "TAQUILLA"
            );
            ticketsPagados.concat(ticketsBoarded).forEach((ticket) => {
              let fechaUpdatedAt = new Date(ticket.updatedAt);
              fechaUpdatedAt.setDate(fechaUpdatedAt.getDate() - 1);
              let fecha = fechaUpdatedAt.toISOString().split("T")[0];
              console.log(fecha);
              let totalPagados = 0;
              let totalBoarded = 0;

              if (
                ticket.status === "PAID" &&
                fecha >= hace30DiasP.toISOString().split("T")[0] &&
                fecha <= hoyP.toISOString().split("T")[0]
              ) {
                totalPagados = (totalPagados + booking.price).toFixed(1);
              }

              if (
                ticket.status === "BOARDED" &&
                fecha >= hace30DiasP.toISOString().split("T")[0] &&
                fecha <= hoyP.toISOString().split("T")[0]
              ) {
                totalBoarded = (
                  totalBoarded +
                  booking.price * (booking.percentage / 100)
                ).toFixed(1);
              }

              let total = parseFloat(totalPagados) + parseFloat(totalBoarded);

              if (
                fecha >= hace30DiasP.toISOString().split("T")[0] &&
                fecha <= hoyP.toISOString().split("T")[0]
              ) {
                let diasPasados = Math.floor(
                  (hoyP - fechaUpdatedAt) / (1000 * 60 * 60 * 24)
                );
                array30DiasP[diasPasados].cantidad += 1;
                array30DiasP[diasPasados].total += total;
              }

              if (
                fecha.split("-")[0] === hoyP.getFullYear().toString() &&
                fecha.split("-")[1] ===
                  (hoyP.getMonth() + 1).toString().padStart(2, "0") &&
                fecha <= hoyP.toISOString().split("T")[0]
              ) {
                arrayMensualP[hoyP.getMonth()].cantidad += 1;
                arrayMensualP[hoyP.getMonth()].total += total;
              }

              if (
                fecha.split("-")[0] >= hace10AnosP.getFullYear().toString() &&
                fecha <= hoyP.toISOString().split("T")[0]
              ) {
                arrayAnualP[
                  hoyP.getFullYear() - parseInt(fecha.split("-")[0])
                ].cantidad += 1;
                arrayAnualP[
                  hoyP.getFullYear() - parseInt(fecha.split("-")[0])
                ].total += total;
              }
            });
          }
        });

        /* GRAFICA DE TICKETS DEVUELTOS */

        let array30DiasR = [];
        let arrayMensualR = [];
        let arrayAnualR = [];

        let hoyR = new Date();
        let hace30DiasR = new Date();
        hace30DiasR.setDate(hoyR.getDate() - 30);
        let hace10AnosR = new Date();
        hace10AnosR.setFullYear(hoyR.getFullYear() - 10);
        for (let i = 0; i < 30; i++) {
          let diaR = new Date();
          diaR.setDate(hoyR.getDate() - i);
          let fechaR = diaR.toISOString().split("T")[0].substring(5); // Solo guarda el mes y el día
          array30DiasR.push({ fecha: fechaR, cantidad: 0 });
        }

        for (let i = 0; i < 12; i++) {
          let mesR = new Date();
          mesR.setMonth(i);
          arrayMensualR.push({
            mes: nombresMeses[mesR.getMonth()],
            cantidad: 0,
          });
        }

        for (let i = 0; i < 10; i++) {
          let anoR = new Date();
          anoR.setFullYear(hoyR.getFullYear() - i);
          arrayAnualR.push({ ano: anoR.getFullYear(), cantidad: 0 });
        }

        filterBookings.forEach((booking) => {
          if (booking.tickets.items) {
            let ticketsReturned = booking.tickets.items.filter(
              (ticket) => ticket.status === "RETURNED"
            );

            ticketsReturned.forEach((ticket) => {
              let fechaUpdatedAt = new Date(ticket.updatedAt);

              if (fechaUpdatedAt >= hace30DiasR && fechaUpdatedAt <= hoyR) {
                let diasPasados = Math.floor(
                  (hoy - fechaUpdatedAt) / (1000 * 60 * 60 * 24)
                );
                array30DiasR[diasPasados].cantidad += 1;
              }

              if (
                fechaUpdatedAt.getFullYear() === hoyR.getFullYear() &&
                fechaUpdatedAt.getMonth() === hoyR.getMonth() &&
                fechaUpdatedAt <= hoyR
              ) {
                arrayMensualR[fechaUpdatedAt.getMonth()].cantidad += 1;
              }

              if (
                fechaUpdatedAt.getFullYear() >= hace10AnosR.getFullYear() &&
                fechaUpdatedAt <= hoyR
              ) {
                arrayAnualR[
                  hoyR.getFullYear() - fechaUpdatedAt.getFullYear()
                ].cantidad += 1;
              }
            });
          }
        });
        console.log(array30DiasR);
        console.log(arrayMensualR);
        console.log(arrayAnualR);
        setListDaysProfit(array30DiasP);
        setListMonthProfit(arrayMensualP);
        setListYearProfit(arrayAnualP);
        setListDaysTravels(array30Dias);
        setListMonthTravels(arrayMensual);
        setListYearTravels(arrayAnual);
        setListDaysReturned(array30DiasR);
        setListMonthReturned(arrayMensualR);
        setListYearReturned(arrayAnualR);
        setDataList(filter);
      }
      setFilterTickets(newFilterTickets);
      setTotalTicketsReturned(ticketsReturned);
      setTotalTicketsSell(totalTickets);
      setTotalAll(totalTodo);
      setTotalGanancias(totalProfit);
      setTotal(newTotal);
    } catch (error) {
      console.error(error);
    }
  };

  const deudaHistory = async () => {
    let opcion = confirm(
      'Recuerda de haber pagado el monto correspondiente a la empresa antes de confirmar. Si hiciste todos los procedimientos puedes pulsar "Aceptar"'
    );
    let des = description;
    try {
      if (opcion) {
        const result = await API.graphql({
          query: mutation.createAgencyHistory,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: {
              agencyID: router.type !== "employee" ? router.id : data.id,
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

  const chartSetting = {
    yAxis: [
      {
        label:
          selectCharts === 1
            ? "Ganancias ($)"
            : selectCharts === 2
            ? "Viajes creados"
            : "Tickets devueltos",
      },
    ],
    width: 900,
    height: 500,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-10px, 0)",
      },
    },
  };

  const valueFormatter = (value) => `${value}`;

  useEffect(() => {
    let hoy = formatearFecha(new Date());
    setDateInput(hoy);
    console.log(data);
  }, []);

  if (dateInput)
    return (
      <div className={styles.content}>
        <Menu />
        <div className="container section">
          <div className={styles.up}>
            <h1>Gestion de pagos</h1>
            <div>
              Introduce el numero de la oficina para poder verificar la
              informacion y gestionar su pago
            </div>
            <div className={styles.search}>
              {router.type !== "employee" && (
                <TextField
                  fullWidth
                  id="outlined-basic"
                  value={business}
                  label="N° de id de la oficina"
                  variant="outlined"
                  onChange={(e) => setBusiness(e.target.value)}
                />
              )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha"
                  format="D/M/YYYY"
                  defaultValue={dayjs(dateInput)}
                  slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                  sx={{
                    marginLeft: 1,
                    width: router.type === "employee" ? 520 : 320,
                  }}
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
                  width: router.type === "employee" ? 300 : 200,
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
                    <h3>Informacion de la oficina</h3>
                    <p>
                      <span>Nombre:</span> {data?.name}
                    </p>
                    <p>
                      <span>Direccion:</span> {data?.city}, {data?.state} -{" "}
                      {data?.address}
                    </p>
                    <p>
                      <span>Correo electronico:</span> {data?.email}
                    </p>
                    <p>
                      <span>Telefono:</span> {data?.phone}
                    </p>
                  </div>
                  <div className={styles.infoTravel}>
                    <h3>Resumen de deuda</h3>
                    <div className={styles.both}>
                      <div>
                        <p>
                          {" "}
                          <span>Tickets vendidos:</span>{" "}
                          {totalTicketsSell.length}
                        </p>
                        <p>
                          {" "}
                          <span>Tickets devueltos:</span>{" "}
                          {totalTicketsReturned.length}
                        </p>
                        <p>
                          {" "}
                          <span>Tickets abordados:</span> {filterTickets.length}
                        </p>

                        <p>
                          {" "}
                          {console.log(filterTickets)}
                          <span>Comision:</span>{" "}
                          {isNaN(totalGanancias + total / data.percentage)
                            ? "0"
                            : totalGanancias + total / data.percentage}
                          $
                        </p>
                        <p>
                          {" "}
                          {console.log(filterTickets)}
                          <span>Ingresos totales:</span> {totalAll}$
                        </p>
                        <p
                          style={{
                            color: "#000",
                            fontWeight: 700,
                          }}
                        >
                          {" "}
                          {console.log(filterTickets)}
                          <span
                            style={{
                              color: "#000",
                              fontWeight: 700,
                            }}
                          >
                            Pago pendiente:
                          </span>{" "}
                          {isNaN(total - total / data?.percentage)
                            ? "0"
                            : totalGanancias + total / data.percentage}
                          $
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
                      marginBottom: 10,
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
                      marginBottom: 10,
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
                          marginBottom: 10,
                        }}
                        // onClick={deudaHistory}
                      >
                        Pago aun pendiente pagar
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
                        marginBottom: 10,
                      }}
                      // onClick={deudaHistory}
                    >
                      Sin pagos pendientes
                    </Button>
                  )}
                </div>
              </div>
            )}
            {dataList.length !== 0 && (
              <div
                style={{
                  flexDirection: "column",
                }}
              >
                {router.type === "onwer" && (
                  <TableAgenciesManagement
                    rows={dataList}
                    businessID={(e) => setBusiness(e)}
                    search={(e) => fetchSearch(e)}
                    cleanList={() => setDataList([])}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                    marginTop: 20,
                  }}
                >
                  <button
                    onClick={() => setSelectModeCharts(1)}
                    style={{
                      width: 100,
                      height: 35,
                      padding: 10,
                      outline: "none",
                      // border: 'none',
                      borderRadius: 5,
                      fontSize: 12,
                      color: "#333",
                      fontWeight: 500,
                      fontFamily: "Montserrat",
                      backgroundColor:
                        selectModeCharts === 1 ? "#84b6f4" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    30 días
                  </button>
                  <button
                    onClick={() => setSelectModeCharts(2)}
                    style={{
                      width: 100,
                      height: 35,
                      padding: 10,
                      outline: "none",
                      // border: 'none',
                      borderRadius: 5,
                      fontSize: 12,
                      color: "#333",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      backgroundColor:
                        selectModeCharts === 2 ? "#84b6f4" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    Mensual
                  </button>
                  <button
                    onClick={() => setSelectModeCharts(3)}
                    style={{
                      width: 100,
                      height: 35,
                      padding: 10,
                      outline: "none",
                      // border: 'none',
                      borderRadius: 5,
                      fontSize: 12,
                      color: "#333",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      backgroundColor:
                        selectModeCharts === 3 ? "#84b6f4" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    Anual
                  </button>
                </div>
                {selectCharts === 1 && (
                  <BarChart
                    dataset={
                      selectModeCharts === 1
                        ? listDaysProfit
                        : selectModeCharts === 2
                        ? listMonthProfit
                        : listYearProfit
                    }
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey:
                          selectModeCharts === 1
                            ? "fecha"
                            : selectModeCharts === 2
                            ? "mes"
                            : "ano",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "cantidad",
                        label: "Tickets totales",
                        valueFormatter,
                      },
                      {
                        dataKey: "total",
                        label: "Ganancias ($)",
                        valueFormatter,
                      },
                    ]}
                    {...chartSetting}
                  />
                )}
                {selectCharts === 2 && (
                  <BarChart
                    dataset={
                      selectModeCharts === 1
                        ? listDaysTravels
                        : selectModeCharts === 2
                        ? listMonthTravels
                        : listYearTravels
                    }
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey:
                          selectModeCharts === 1
                            ? "fecha"
                            : selectModeCharts === 2
                            ? "mes"
                            : "ano",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "cantidad",
                        label: "Viajes totales",
                        valueFormatter,
                      },
                    ]}
                    {...chartSetting}
                  />
                )}
                {selectCharts === 3 && (
                  <BarChart
                    dataset={
                      selectModeCharts === 1
                        ? listDaysReturned
                        : selectModeCharts === 2
                        ? listMonthReturned
                        : listYearReturned
                    }
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey:
                          selectModeCharts === 1
                            ? "fecha"
                            : selectModeCharts === 2
                            ? "mes"
                            : "ano",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "cantidad",
                        label: "Devoluciones",
                        valueFormatter,
                      },
                    ]}
                    {...chartSetting}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <button
                    onClick={() => setSelectCharts(1)}
                    style={{
                      width: 120,
                      height: 50,
                      padding: 10,
                      outline: "none",
                      // border: 'none',
                      borderRadius: 5,
                      fontSize: 14,
                      color: "#333",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      backgroundColor: selectCharts === 1 ? "#77dd77" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    Ganancias
                  </button>
                  <button
                    onClick={() => setSelectCharts(2)}
                    style={{
                      width: 120,
                      height: 50,
                      padding: 10,
                      outline: "none",
                      borderRadius: 5,
                      fontSize: 14,
                      color: "#333",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      backgroundColor: selectCharts === 2 ? "#fdfd96" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    Viajes
                  </button>
                  <button
                    onClick={() => setSelectCharts(3)}
                    style={{
                      width: 120,
                      height: 50,
                      padding: 10,
                      outline: "none",
                      borderRadius: 5,
                      fontSize: 14,
                      color: "#333",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      backgroundColor: selectCharts === 3 ? "#84b6f4" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    Devoluciones
                  </button>
                </div>
              </div>
            )}
            {/* {router.type === 'employee' && listDaysProfit.length !== 0 && (
              <div
                style={{
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                    marginTop: 20,
                  }}
                >
                  <button
                    onClick={() => setSelectModeCharts(1)}
                    style={{
                      width: 100,
                      height: 35,
                      padding: 10,
                      outline: "none",
                      // border: 'none',
                      borderRadius: 5,
                      fontSize: 12,
                      color: "#333",
                      fontWeight: 500,
                      fontFamily: "Montserrat",
                      backgroundColor:
                        selectModeCharts === 1 ? "#84b6f4" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    30 días
                  </button>
                  <button
                    onClick={() => setSelectModeCharts(2)}
                    style={{
                      width: 100,
                      height: 35,
                      padding: 10,
                      outline: "none",
                      // border: 'none',
                      borderRadius: 5,
                      fontSize: 12,
                      color: "#333",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      backgroundColor:
                        selectModeCharts === 2 ? "#84b6f4" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    Mensual
                  </button>
                  <button
                    onClick={() => setSelectModeCharts(3)}
                    style={{
                      width: 100,
                      height: 35,
                      padding: 10,
                      outline: "none",
                      // border: 'none',
                      borderRadius: 5,
                      fontSize: 12,
                      color: "#333",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      backgroundColor:
                        selectModeCharts === 3 ? "#84b6f4" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    Anual
                  </button>
                </div>
                {selectCharts === 1 && (
                  <BarChart
                    dataset={
                      selectModeCharts === 1
                        ? listDaysProfit
                        : selectModeCharts === 2
                        ? listMonthProfit
                        : listYearProfit
                    }
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey:
                          selectModeCharts === 1
                            ? "fecha"
                            : selectModeCharts === 2
                            ? "mes"
                            : "ano",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "cantidad",
                        label: "Tickets totales",
                        valueFormatter,
                      },
                      {
                        dataKey: "total",
                        label: "Ganancias ($)",
                        valueFormatter,
                      },
                    ]}
                    {...chartSetting}
                  />
                )}
                {selectCharts === 2 && (
                  <BarChart
                    dataset={
                      selectModeCharts === 1
                        ? listDaysTravels
                        : selectModeCharts === 2
                        ? listMonthTravels
                        : listYearTravels
                    }
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey:
                          selectModeCharts === 1
                            ? "fecha"
                            : selectModeCharts === 2
                            ? "mes"
                            : "ano",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "cantidad",
                        label: "Viajes totales",
                        valueFormatter,
                      },
                    ]}
                    {...chartSetting}
                  />
                )}
                {selectCharts === 3 && (
                  <BarChart
                    dataset={
                      selectModeCharts === 1
                        ? listDaysReturned
                        : selectModeCharts === 2
                        ? listMonthReturned
                        : listYearReturned
                    }
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey:
                          selectModeCharts === 1
                            ? "fecha"
                            : selectModeCharts === 2
                            ? "mes"
                            : "ano",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "cantidad",
                        label: "Devoluciones",
                        valueFormatter,
                      },
                    ]}
                    {...chartSetting}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <button
                    onClick={() => setSelectCharts(1)}
                    style={{
                      width: 120,
                      height: 50,
                      padding: 10,
                      outline: "none",
                      // border: 'none',
                      borderRadius: 5,
                      fontSize: 14,
                      color: "#333",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      backgroundColor: selectCharts === 1 ? "#77dd77" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    Ganancias
                  </button>
                  <button
                    onClick={() => setSelectCharts(2)}
                    style={{
                      width: 120,
                      height: 50,
                      padding: 10,
                      outline: "none",
                      borderRadius: 5,
                      fontSize: 14,
                      color: "#333",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      backgroundColor: selectCharts === 2 ? "#fdfd96" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    Viajes
                  </button>
                  <button
                    onClick={() => setSelectCharts(3)}
                    style={{
                      width: 120,
                      height: 50,
                      padding: 10,
                      outline: "none",
                      borderRadius: 5,
                      fontSize: 14,
                      color: "#333",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      backgroundColor: selectCharts === 3 ? "#84b6f4" : "#fff",
                      borderWidth: 1,
                      borderColor: "#1f1f1f",
                    }}
                  >
                    Devoluciones
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    );
};

export default Management;
