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

const Management = () => {
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
  const [selectCharts, setSelectCharts] = useState(2);
  const [selectModeCharts, setSelectModeCharts] = useState(1);
  const [deuda, setDeuda] = useState(false);
  const [totalBookings, setTotalBookings] = useState(null);
  const [totalProfit, setTotalProfit] = useState(null);
  const [deudaAll, setDeudaAll] = useState(null);
  const [totalTicketAll, setTotalTicketAll] = useState(null);

  const formatearFecha = (fecha) => {
    let año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan desde 0
    let dia = fecha.getDate();

    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;

    return año + "-" + mes + "-" + dia;
  };
  const fetchSearch = async (businessId) => {
    setDescription("");
    // setDeuda(true);
    setData(null);
    setDataList([]);
    let totalTickets = [];
    let totalTicketsAbordados = [];
    let totalRetornados = [];
    let totalProfitTIcket = 0;
    let totalProfitNoBoarded = 0;
    let totalDeuda = 0;
    let totalTodo = 0;

    try {
      // buscamos los viajes ya partidos o llegados de las agencias
      if (business || businessId) {
        const bookingtoPaid = await API.graphql({
          query: queries.listBookings,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            filter: {
              and: [
                { agencyID: { eq: businessId ? businessId : business } },
                {
                  or: [
                    { status: { eq: "ARRIVED" } },
                    { status: { eq: "DEPARTED" } },
                  ],
                },
              ],
            },
          },
        });
        // lista de viajes de la fecha
        const listBookingDate =
          bookingtoPaid?.data?.listBookings?.items?.filter(
            (r) => r.departure.date === dateInput
          );
        //console.log("DATA: ", listBookingDate[0]?.agency);
        setData(listBookingDate[0]?.agency);
        setTotalBookings(listBookingDate);
        console.log("NUMERO TOTAL DE VIAJES: ", listBookingDate.length);
        // lista de tickets de la fecha
        const ticketsBooking = listBookingDate.map((booking, index) => {
          const precioTicket =
            booking.price + booking.price / booking.percentage;
          //console.log("PRECIO TICKET", precioTicket);
          return booking?.tickets?.items?.map((ticket, index) => {
            if (ticket?.status !== "RETURNED") {
              totalTickets.push(ticket);
              totalProfitTIcket += booking.price / booking.percentage;
              totalTodo += precioTicket;
            }
            if (ticket?.status === "BOARDED") {
              totalTicketsAbordados.push(ticket);
              totalDeuda += booking.price;
            }
            if (ticket?.status === "RETURNED") {
              totalRetornados.push(ticket);
            }
            if (ticket?.status === "PAID") {
              totalProfitNoBoarded += booking.price;
            }
            return { ...ticket, price: precioTicket };
          });
        });
        setTotalTicketAll(...ticketsBooking);
        //console.log("NUMERO TOTAL DE TICKETS: ", totalTickets.length);
        setTotalTicketsSell(totalTickets);
        //console.log(
        //   "NUMERO TOTAL DE ABORDADOS: ",
        //   totalTicketsAbordados.length
        // );
        setFilterTickets(totalTicketsAbordados);
        //console.log("NUMERO TOTAL DE RETORNADOS: ", totalRetornados.length);
        setTotalTicketsReturned(totalRetornados);
        // busquemos las ganancias por ticket
        //console.log("TOTAL DE GANANCIAS PORTICKET: ", totalProfitTIcket);
        // bsuquemos lo que hay que poagar
        //console.log("DEUDA A PAGAR: ", totalDeuda);
        setDeudaAll(totalDeuda);
        //  total de ganancia spor ticket y no abordados
        //console.log(
        //   "TOTAL GANACIA +  NO ABORDADO: ",
        //   totalProfitNoBoarded + totalProfitTIcket
        // );
        setTotalProfit(totalProfitNoBoarded + totalProfitTIcket);
        //console.log("Total de ingresos: ", totalTodo);
        setTotalAll(totalTodo);
        // aqui se termina de mostrar lo de resumen de deuda.
        // busquemos si ya la deuda fue pagada en history
        const historyReason = await API.graphql({
          query: queries.listAgencyHistories,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            filter: {
              and: [
                { agencyID: { eq: businessId ? businessId : business } },
                {
                  reason: { eq: `DEUDA_PAGADA[${dateInput}]` },
                },
              ],
            },
          },
        });
        // si exxiste registro entonces no hay deuda
        if (historyReason.data.listAgencyHistories.items.length > 0) {
          setDeuda(false);
        } else if (historyReason.data.listAgencyHistories.items.length <= 0) {
          setDeuda(true);
        }

        //console.log("HISTORIA DE AGENCIA: ", historyReason);
        setDataList([]);
      } else {
        // aqui comenzamos cuando no colocan id en business
        // buscamos todas las agencias
        const result = await API.graphql({
          query: queries.listAgencies,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          // variables: {
          // },
        });
        // la filtramos por ativo
        let filter = result.data.listAgencies.items.filter(
          (item, index) => item.status === "ACTIVO"
        );
        // arreglos para los datos segun el filtro de estadisticas
        let array30Dias = [];
        let arrayTicket30Dias = [];
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
        // grafica viajes
        for (let i = 0; i < 30; i++) {
          let dia = new Date();
          dia.setDate(hoy.getDate() - i);
          let fecha = dia.toISOString().split("T")[0].substring(5); // Solo guarda el mes y el día
          array30Dias.push({ fecha: fecha, cantidad: 0, tickets: 0, total: 0 });
        }

        for (let i = 0; i < 12; i++) {
          let mes = new Date();
          mes.setMonth(i);
          arrayMensual.push({
            mes: nombresMeses[mes.getMonth()],
            cantidad: 0,
            tickets: 0,
            total: 0,
          });
        }

        for (let i = 0; i < 10; i++) {
          let ano = new Date();
          ano.setFullYear(hoy.getFullYear() - i);
          arrayAnual.push({
            ano: ano.getFullYear(),
            cantidad: 0,
            tickets: 0,
            total: 0,
          });
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
                array30Dias[diasPasados].tickets +=
                  booking.tickets.items.length;
                console.log("BOOKIGS: ", booking);
              }

              if (
                fechaDeparture.getFullYear() === hoy.getFullYear() &&
                fechaDeparture.getMonth() === hoy.getMonth() &&
                fechaDeparture <= hoy
              ) {
                arrayMensual[fechaDeparture.getMonth()].cantidad++;
                arrayMensual[fechaDeparture.getMonth()].tickets +=
                  booking.tickets.items.length;
              }

              if (
                fechaDeparture.getFullYear() >= hace10Anos.getFullYear() &&
                fechaDeparture <= hoy
              ) {
                arrayAnual[hoy.getFullYear() - fechaDeparture.getFullYear()]
                  .cantidad++;
                arrayAnual[
                  hoy.getFullYear() - fechaDeparture.getFullYear()
                ].tickets += booking.tickets.items.length;
              }

              // aqui va las ganancias
              if (booking.tickets.items) {
                let ticketsPagados = booking.tickets.items.filter(
                  (ticket) =>
                    ticket.status === "PAID" &&
                    ticket.description !== "TAQUILLA"
                );
                let ticketsBoarded = booking.tickets.items.filter(
                  (ticket) =>
                    ticket.status === "BOARDED" &&
                    ticket.description !== "TAQUILLA"
                );
                ticketsPagados.concat(ticketsBoarded).forEach((ticket) => {
                  let fechaUpdatedAt = new Date(ticket.updatedAt);
                  fechaUpdatedAt.setDate(fechaUpdatedAt.getDate() - 1);
                  let fecha = fechaUpdatedAt.toISOString().split("T")[0];

                  let totalPagados = 0;
                  let totalBoarded = 0;

                  if (
                    ticket.status === "PAID" &&
                    fecha >= hace30Dias.toISOString().split("T")[0] &&
                    fecha <= hoy.toISOString().split("T")[0]
                  ) {
                    totalPagados = (
                      totalPagados +
                      booking.price +
                      booking.price / booking.percentage
                    ).toFixed(1);
                  }

                  if (
                    ticket.status === "BOARDED" &&
                    fecha >= hace30Dias.toISOString().split("T")[0] &&
                    fecha <= hoy.toISOString().split("T")[0]
                  ) {
                    totalBoarded = (
                      totalBoarded +
                      booking.price * (booking.percentage / 100)
                    ).toFixed(1);
                  }

                  let total =
                    parseFloat(totalPagados) + parseFloat(totalBoarded);

                  if (fechaDeparture >= hace30Dias && fechaDeparture <= hoy) {
                    let diasPasados = Math.floor(
                      (hoy - fechaDeparture) / (1000 * 60 * 60 * 24)
                    );
                    array30Dias[diasPasados].total += total;
                  }

                  if (
                    fechaDeparture.getFullYear() === hoy.getFullYear() &&
                    fechaDeparture.getMonth() === hoy.getMonth() &&
                    fechaDeparture <= hoy
                  ) {
                    arrayMensual[hoy.getMonth()].total += total;
                  }

                  if (
                    fechaDeparture.getFullYear() >= hace10Anos.getFullYear() &&
                    fechaDeparture <= hoy
                  ) {
                    arrayAnual[
                      hoy.getFullYear() - parseInt(fecha.split("-")[0])
                    ].total += total;
                  }
                });
              }
            });
          }
        });

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

              let totalPagados = 0;
              let totalBoarded = 0;

              if (
                ticket.status === "PAID" &&
                fecha >= hace30DiasP.toISOString().split("T")[0] &&
                fecha <= hoyP.toISOString().split("T")[0]
              ) {
                totalPagados = (
                  totalPagados +
                  booking.price +
                  booking.price / booking.percentage
                ).toFixed(1);
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

        setListDaysProfit(array30DiasP.reverse());
        setListMonthProfit(arrayMensualP.reverse());
        setListYearProfit(arrayAnualP.reverse());
        setListDaysTravels(array30Dias.reverse());
        setListMonthTravels(arrayMensual.reverse());
        setListYearTravels(arrayAnual.reverse());
        setListDaysReturned(array30DiasR.reverse());
        setListMonthReturned(arrayMensualR.reverse());
        setListYearReturned(arrayAnualR.reverse());
        setDataList(filter);
      }
    } catch (error) {
      //console.log(error);
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
      //console.log(error);
    }
  };

  const resumenSimple = () => {
    if (!totalTicketAll || totalTicketAll.length === 0) {
      alert("No tienes nada");
      return;
    }
    let newArray = totalTicketAll.map((item, index) => {
      return {
        ID_Viaje: item.bookingID,
        ID_Ticket: item.id,
        Codigo_Pasajero: item.code,
        Precio: item.booking.price,
        Porcentaje: item.booking.percentage,
        ESTADO: item.status,
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
  };

  const resumenDetallado = () => {
    if (!totalTicketAll || totalTicketAll.length === 0) {
      alert("No tienes nada");
      return;
    }

    let newArray = totalTicketAll.map((item, index) => {
      return {
        ID_Empresa: item.booking.agencyID,
        ID_Oficina: item.booking.officeID,
        ID_Empleado: item.booking.createdBy,
        ID_Viaje: item.booking.id,
        ID_Ticket: item.id,
        ID_Orden_Venta: item.orderDetailID,
        ID_Cliente: item.customerID,
        Codigo_Viaje: item.booking.code,
        Codigo_Pasajero: item.code,
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
    fetchSearch();
  }, []);

  if (dateInput)
    return (
      <div className={styles.content}>
        <Menu ancho={249} />
        <div className="container section">
          <div className={styles.up}>
            <h1 style={{ textAlign: "center" }}>Gestion de pagos</h1>
            <div style={{ textAlign: "center" }}>
              Introduce el numero de la empresa para poder verificar la
              informacion y gestionar su pago
            </div>
            {/* Search Arriba */}
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
                    //console.log("FECHA: ", new Date(e).toISOString().slice(0, 10));
                    // let fecha = formatearFecha(new Date(e));
                    //console.log("FECHA 2:", fecha);
                    //console.log(
                    //   "FECHA SELECCIONADA: ",
                    //   new Date(e).toISOString(e).slice(0, 10)
                    // );
                    setDateInput(new Date(e).toISOString().slice(0, 10));
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
            {/* Vista de cuando eliges un negocio */}
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
                    <h3>Resumen de deuda</h3>
                    <div className={styles.both}>
                      <div>
                        <p>
                          {" "}
                          <span>Viajes:</span> {totalBookings.length}
                        </p>
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
                          <span>Ganancias:</span> {totalProfit}$
                        </p>
                        <p>
                          {" "}
                          <span>Ingresos totales:</span> {totalAll}$
                        </p>
                        <p
                          style={{
                            color: "#000",
                            fontWeight: 700,
                          }}
                        >
                          {" "}
                          <span
                            style={{
                              color: "#000",
                              fontWeight: 700,
                            }}
                          >
                            Deuda ha pagar:
                          </span>{" "}
                          {deudaAll}$
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
                  {deuda ? (
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
            {/* contenedor ompre desde las tablas lista de agencias hasta su grafico */}
            {dataList.length !== 0 && (
              <div
                style={{
                  flexDirection: "column",
                }}
              >
                {/* Tabla Listas de AGencias */}
                <TableAgenciesManagement
                  rows={dataList}
                  businessID={(e) => setBusiness(e)}
                  search={(e) => fetchSearch(e)}
                  cleanList={() => setDataList([])}
                />
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
                      {
                        dataKey: "tickets",
                        label: "TIckets totales",
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
                  {/* <button
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
                  </button> */}
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
          </div>
        </div>
      </div>
    );
};

export default Management;
