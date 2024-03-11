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
import SearchOffIcon from "@mui/icons-material/SearchOff";

const Management = () => {
  const router = useRouter().query;

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
  const [totalGanancias, setTotalGanancias] = useState(0);
  const [deuda, setDeuda] = useState(false);
  const [totalBookings, setTotalBookings] = useState(null);
  const [totalProfit, setTotalProfit] = useState(null);
  const [deudaAll, setDeudaAll] = useState(null);
  const [totalTicketAll, setTotalTicketAll] = useState(null);
  const [history, setHistory] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const formatearFecha = (fecha) => {
    let año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan desde 0
    let dia = fecha.getDate();

    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;

    return año + "-" + mes + "-" + dia;
  };
  const fetchSearch = async (search, businessId) => {
    setDescription("");
    setDeuda(true);
    setData(null);
    setDataList([]);
    let totalTickets = [];
    let totalTicketsAbordados = [];
    let totalRetornados = [];
    let totalTicketTaquilla = [];
    let totalProfitTIcket = 0;
    let totalProfitNoBoarded = 0;
    let totalDeuda = 0;
    let totalTodo = 0;
    let agencyID = router.id;
    const officeID = businessId ? businessId : business;
    try {
      console.log("averigaundo: ", {
        business,
        businessId,
        ROUTER: router.offficeID,
        dateInput,
        search,
      });
      if (dateInput && search && (business || businessId || router.offficeID)) {
        console.log("ENTRO EN LISTA");
        // preguntamos si es owner o employye
        let bookingtoPaid;
        if (router.type === "owner") {
          const resultOwner = await API.graphql({
            query: queries.listBookings,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              filter: {
                and: [
                  {
                    agencyID: { eq: agencyID },
                  },
                  {
                    officeID: { eq: officeID },
                  },
                ],
              },
            },
          });
          bookingtoPaid = resultOwner;
        } else if (router.type === "employee") {
          const resultEmployee = await API.graphql({
            query: queries.getEmployee,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              id: agencyID, // en realidad es el employeed ID en este caso
            },
          });
          agencyID = resultEmployee?.data?.getEmployee?.agencyID;
          const resultOwner = await API.graphql({
            query: queries.listBookings,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              filter: {
                and: [
                  {
                    agencyID: {
                      eq: resultEmployee?.data?.getEmployee?.agencyID,
                    },
                  },
                  {
                    officeID: { eq: router.offficeID },
                  },
                ],
              },
            },
          });
          bookingtoPaid = resultOwner;
        }

        const listBookingDate =
          bookingtoPaid?.data?.listBookings?.items?.filter(
            (r) => r.departure.date === dateInput
          );
        console.log("AQUI SE CARGO");
        // datos de oficina
        setData(listBookingDate[0]?.office);
        // todos los viajes
        setTotalBookings(listBookingDate);
        // console.log("NUMERO TOTAL DE VIAJES: ", listBookingDate.length);

        const ticketsBooking = listBookingDate.map((booking, index) => {
          const precioTicket = booking.price;
          //console.log("PRECIO TICKET", precioTicket);
          return booking?.tickets?.items?.map((ticket, index) => {
            // console.log("TICKETS: ", ticket);
            if (
              ticket?.status === "PAID" &&
              ticket?.description === "TAQUILLA"
            ) {
              totalTicketTaquilla.push(...ticket);
            }

            if (ticket?.status !== "RETURNED") {
              totalTickets.push(ticket);
            }
            if (ticket?.status === "BOARDED") {
              totalTicketsAbordados.push(ticket);
              totalProfitTIcket += booking.price;
            }
            if (ticket?.status === "RETURNED") {
              totalRetornados.push(ticket);
            }
            return { ...ticket, price: precioTicket };
          });
        });

        // Total de tickets por taquilla
        // console.log("TIKCETS POR TAQUILLA: ", totalTicketTaquilla.length);
        setTotalTicketsSell(totalTicketTaquilla);
        // total de tickets devuelvos
        // console.log("TICKETS DEVUELVOS: ", totalRetornados.length);
        setTotalTicketsReturned(totalRetornados);
        // total tickets abordados
        // console.log("TICKETS ABORDADOS: ", totalTicketsAbordados.length);
        setFilterTickets(totalTicketsAbordados);
        // ingresos totales
        setTotalProfit(totalProfitTIcket);
        // pago pendiente
        setDeudaAll(totalProfitTIcket);
        // aqui se termina de mostrar lo de resumen de deuda.
        // busquemos si ya la deuda fue pagada en history
        // console.log("HSITORICO: ", `DEUDA_PAGADA[${dateInput}]`);
        const historyReason = await API.graphql({
          query: queries.listAgencyHistories,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            filter: {
              and: [
                { agencyID: { eq: agencyID } },
                { reason: { eq: `DEUDA_PAGADA[${dateInput}]` } },
              ],
            },
          },
        });
        // si exxiste registro entonces no hay deuda
        // console.log("HISTORY: ", historyReason);
        if (historyReason.data.listAgencyHistories.items.length > 0) {
          setHistory(historyReason.data.listAgencyHistories.items[0]);
          setDeuda(false);
        } else if (historyReason.data.listAgencyHistories.items.length <= 0) {
          setDeuda(true);
        }

        //console.log("HISTORIA DE AGENCIA: ", historyReason);
        setDataList([]);
      } else {
        console.log("ENTRO EN GRAFICA");
        let result;
        if (router.type === "owner") {
          const resultOwner = await API.graphql({
            query: queries.listOffices,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              filter: {
                agencyID: { eq: router.id },
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

          result = resultEmployee;
        }
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
              let ticketsEnBoarded = booking.tickets.items.filter(
                (t) => t.status === "BOARDED"
              );
              if (fechaDeparture >= hace30Dias && fechaDeparture <= hoy) {
                let diasPasados = Math.floor(
                  (hoy - fechaDeparture) / (1000 * 60 * 60 * 24)
                );
                array30Dias[diasPasados].cantidad++;
                array30Dias[diasPasados].tickets += ticketsEnBoarded.length;
              }

              if (
                fechaDeparture.getFullYear() === hoy.getFullYear() &&
                fechaDeparture.getMonth() === hoy.getMonth() &&
                fechaDeparture <= hoy
              ) {
                arrayMensual[fechaDeparture.getMonth()].cantidad++;
                arrayMensual[fechaDeparture.getMonth()].tickets +=
                  ticketsEnBoarded.length;
              }

              if (
                fechaDeparture.getFullYear() >= hace10Anos.getFullYear() &&
                fechaDeparture <= hoy
              ) {
                arrayAnual[hoy.getFullYear() - fechaDeparture.getFullYear()]
                  .cantidad++;
                arrayAnual[
                  hoy.getFullYear() - fechaDeparture.getFullYear()
                ].tickets += ticketsEnBoarded.length;
              }

              // aqui va las ganancias
              if (booking.tickets.items) {
                let ticketsPagados = [];
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
                    ticket.status === "BOARDED" &&
                    fecha >= hace30Dias.toISOString().split("T")[0] &&
                    fecha <= hoy.toISOString().split("T")[0]
                  ) {
                    totalBoarded = (totalBoarded + booking.price).toFixed(1);
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
            // let ticketsPagados = booking.tickets.items.filter(
            //   (ticket) => {
            //     ticket.status === "PAID" && ticket.description === "TAQUILLA" && fechaFormateada === dateInput
            //     console.log(fechaFormateada)
            //   }
            // );
            booking.tickets.items.forEach((ticket) => {
              let fechaFormateada = formatearFecha(new Date(ticket?.updatedAt));
              if (
                ticket.status === "PAID" &&
                ticket.description === "TAQUILLA" &&
                fechaFormateada === dateInput
              ) {
                totalTickets.push({ ticket: ticket, booking: booking });
              }
              // console.log(fechaFormateada);
            });
            let ticketsBoarded = booking.tickets.items.filter(
              (ticket) =>
                ticket.status === "BOARDED" && ticket.description !== "TAQUILLA"
            );
            ticketsBoarded.forEach((ticket) => {
              let fechaUpdatedAt = new Date(ticket.updatedAt);
              fechaUpdatedAt.setDate(fechaUpdatedAt.getDate());
              let fecha = fechaUpdatedAt.toISOString().split("T")[0];
              // let totalPagados = 0;
              let totalBoarded = 0;

              // if (
              //   ticket.status === "PAID" &&
              //   fecha >= hace30DiasP.toISOString().split("T")[0] &&
              //   fecha <= hoyP.toISOString().split("T")[0]
              // ) {
              //   totalPagados = (totalPagados + booking.price).toFixed(1);
              // }

              if (
                ticket.status === "BOARDED" &&
                fecha >= hace30DiasP.toISOString().split("T")[0] &&
                fecha <= hoyP.toISOString().split("T")[0]
              ) {
                totalBoarded = (totalBoarded + booking.price).toFixed(1);
              }

              let total = parseFloat(totalBoarded);

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
      // setFilterTickets(newFilterTickets);
      // setTotalTicketsReturned(ticketsReturned);
      // setTotalTicketsSell(totalTickets);
      // setTotalAll(totalTodo);
      // setTotalGanancias(totalProfit);
      // setTotal(newTotal);
      // if (newTotal === 0) setDeuda(false);
    } catch (error) {
      console.log("ERROR AL CONSULTAR: ", error);
    }
    return;
    let newFilterTickets = [];
    let newTotal = 0;
    // let totalTickets = [];
    let ticketsReturned = [];
    let totalProfit = 0;
    // let totalTodo = 0;
    try {
      if (business || businessId) {
        let result;
        if (router.type === "owner") {
          const resultOwner = await API.graphql({
            query: queries.listOffices,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              filter: {
                agencyID: { eq: router.id },
                id: {
                  eq: business,
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

        setData(result.data.listOffices.items[0]);
        // result.data.listOffices.items[0].history.items.map((item, index) => {
        //   let coincidencia = item.reason.match(/\[(.*?)\]/);
        //   let fecha = coincidencia ? coincidencia[1] : null;
        //   if (fecha === dateInput) setDeuda(false);
        // });
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
              newFilterTickets.push({ ticket: ticket, booking: booking });
              setDateInputSearch(fechaFormateada);
            }
            // if (ticket.status !== "RETURNED" && fechaFormateada === dateInput) {
            //   totalTickets.push({ ticket: ticket, booking: booking });
            //   totalTodo += booking.price;
            //   setDateInputSearch(fechaFormateada);
            // }

            if (
              ticket.status === "PAID" &&
              ticket.description === "TAQUILLA" &&
              fechaFormateada === dateInput
            ) {
              totalTickets.push({ ticket: ticket, booking: booking });
              totalTodo += booking.price;
              newFilterTickets.push({ ticket: ticket, booking: booking });
            }
          });
        });
        setDataList([]);
      } else {
        let result;
        if (router.type === "owner") {
          const resultOwner = await API.graphql({
            query: queries.listOffices,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              filter: {
                agencyID: { eq: router.id },
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
            // let ticketsPagados = booking.tickets.items.filter(
            //   (ticket) => {
            //     ticket.status === "PAID" && ticket.description === "TAQUILLA" && fechaFormateada === dateInput
            //     console.log(fechaFormateada)
            //   }
            // );
            booking.tickets.items.forEach((ticket) => {
              let fechaFormateada = formatearFecha(new Date(ticket?.updatedAt));
              if (
                ticket.status === "PAID" &&
                ticket.description === "TAQUILLA" &&
                fechaFormateada === dateInput
              ) {
                totalTickets.push({ ticket: ticket, booking: booking });
              }
              console.log(fechaFormateada);
            });
            let ticketsBoarded = booking.tickets.items.filter(
              (ticket) =>
                ticket.status === "BOARDED" && ticket.description !== "TAQUILLA"
            );
            ticketsBoarded.forEach((ticket) => {
              let fechaUpdatedAt = new Date(ticket.updatedAt);
              fechaUpdatedAt.setDate(fechaUpdatedAt.getDate());
              let fecha = fechaUpdatedAt.toISOString().split("T")[0];
              // let totalPagados = 0;
              let totalBoarded = 0;

              // if (
              //   ticket.status === "PAID" &&
              //   fecha >= hace30DiasP.toISOString().split("T")[0] &&
              //   fecha <= hoyP.toISOString().split("T")[0]
              // ) {
              //   totalPagados = (totalPagados + booking.price).toFixed(1);
              // }

              if (
                ticket.status === "BOARDED" &&
                fecha >= hace30DiasP.toISOString().split("T")[0] &&
                fecha <= hoyP.toISOString().split("T")[0]
              ) {
                totalBoarded = (totalBoarded + booking.price).toFixed(1);
              }

              let total = parseFloat(totalBoarded);

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
      setFilterTickets(newFilterTickets);
      setTotalTicketsReturned(ticketsReturned);
      setTotalTicketsSell(totalTickets);
      setTotalAll(totalTodo);
      setTotalGanancias(totalProfit);
      setTotal(newTotal);
      if (newTotal === 0) setDeuda(false);
    } catch (error) {
      console.error(error);
    }
  };

  const resumenSimple = () => {
    if (!filterTickets || filterTickets.length === 0) {
      alert("No tienes nada");
      return;
    }

    let newArray = filterTickets.map((item, index) => {
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
        Ciudad_Llegada: item.booking.arrival.city,
        Fecha_Llegada: item.booking.arrival.date,
        Hora_Llegada: item.booking.arrival.time,
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
    if (!filterTickets || filterTickets.length === 0) {
      alert("No tienes nada");
      return;
    }
    let newArray = filterTickets.map((item, index) => {
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
        Ciudad_Llegada: item.booking.arrival.city,
        Fecha_Llegada: item.booking.arrival.date,
        Hora_Llegada: item.booking.arrival.time,
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
        <Menu ancho={288} />
        <div className="container section">
          <div className={styles.up}>
            <h1
              style={{
                textAlign: "center",
              }}
            >
              Gestion de pagos
            </h1>
            <div
              style={{
                textAlign: "center",
              }}
            >
              Selecciona la fecha para poder verificar la informacion y
              gestionar su pago
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
                onClick={() => {
                  fetchSearch(true);
                }}
              >
                Buscar
              </Button>
              {router.type === "employee" && (
                <Button
                  color="error"
                  variant="contained"
                  sx={{
                    height: 55,
                    width: 40,
                    marginLeft: 1,
                  }}
                  onClick={() => {
                    setData(null);

                    fetchSearch(false);
                  }}
                >
                  <SearchOffIcon />
                </Button>
              )}
            </div>

            {data && dateInput && (
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
                          <span>Viajes:</span> {totalBookings?.length}
                        </p>
                        <p>
                          {" "}
                          <span>Tickets por taquilla:</span>{" "}
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

                        {/* <p>
                          {" "}
                          <span>Comision:</span>{" "}
                          {isNaN(totalGanancias + total / data.percentage)
                            ? "0"
                            : totalGanancias + total / data.percentage}
                          $
                        </p> */}
                        <p>
                          {" "}
                          <span>Ingresos totales:</span> {totalProfit}$
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
                            Pago pendiente:
                          </span>{" "}
                          {deudaAll}$
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {data && (
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

                    {deudaAll !== null && deudaAll > 0 && (
                      <>
                        {" "}
                        {deuda ? (
                          <div
                            style={{
                              marginLeft: 25,
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="error"
                              sx={{
                                marginTop: 1,
                                height: 55,
                                width: 250,
                                marginBottom: 10,
                              }}
                            >
                              Pago aun pendiente pagar
                            </Button>
                          </div>
                        ) : (
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
                              placeholder={history ? history.description : ""}
                              style={{
                                padding: 5,
                                outline: "none",
                              }}
                              disabled
                            />
                            <Button
                              variant="outlined"
                              sx={{
                                marginTop: 1,
                                height: 55,
                                width: 250,
                                marginBottom: 10,
                              }}
                            >
                              Sin pagos pendientes
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
            {dataList.length !== 0 && (
              <div
                style={{
                  flexDirection: "column",
                }}
              >
                {router.type === "owner" && (
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
