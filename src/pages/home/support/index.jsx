import Menu from "@/components/Menu";
import React, { useState } from "react";
import styles from "@/styles/Support.module.css";
import { Button, TextField } from "@mui/material";
import * as queries from "@/graphql/custom/queries";
import * as mutation from "@/graphql/custom/mutations";
import { Auth, API } from "aws-amplify";

const Support = () => {
  const [orderTravel, setOrderTravel] = useState("");
  const [data, setData] = useState(null);

  const fetchOrder = async () => {
    try {
      const result = await API.graphql({
        query: queries.getOrderDetail,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          // filter: {
          id: orderTravel,
          // }
        },
      });
      console.log(result.data.getOrderDetail);
      setData(result.data.getOrderDetail);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReturned = async () => {
    let opcion = confirm(
      'Recuerda de haber devuelto el pago correspondiente al cliente antes de realizar la devolucion. Si hiciste todos los procedimientos puedes pulsar "Aceptar"'
    );
    if (opcion) {
      try {
        await Promise.all(
          data.tickets.items.map(async (item, index) => {
            const ticket = await API.graphql({
              query: mutation.updateTicket,
              authMode: "AMAZON_COGNITO_USER_POOLS",
              variables: {
                input: {
                  id: item.id,
                  status: "RETURNED",
                },
              },
            });
            console.log(ticket);
          })
        );

        const order = await API.graphql({
          query: mutation.updateOrderDetail,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: {
              id: data.id,
              status: "RETURNED",
            },
          },
        });
        console.log(order);
        let stockNew = data.booking.stock + data.tickets.items.length;
        console.log(stockNew);
        const booking = await API.graphql({
          query: mutation.updateBooking,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: {
              id: data.bookingID,
              stock: stockNew,
            },
          },
        });
        console.log(booking);
        setOrderTravel("");
        setData(null);
        alert("Tu devolucion ha sido un exito!");
      } catch (error) {
        console.log(error);
        alert("No se ha podido completar tu devolucion");
      }
    } else {
      alert("No se ha podido completar tu devolucion");
    }
  };

  console.log(orderTravel);
  return (
    <div className={styles.content}>
      <Menu ancho={250} />
      <div className="container section">
        <div className={styles.up}>
          <h1>Devoluciones</h1>
          <div>
            Introduce el numero de la orden del viaje para poder verificar la
            informacion y realizar la devolucion
          </div>
          <div className={styles.search}>
            <TextField
              fullWidth
              id="outlined-basic"
              value={orderTravel}
              label="N° de orden de viaje"
              variant="outlined"
              onChange={(e) => setOrderTravel(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                height: 55,
                width: 200,
                marginLeft: 3,
              }}
              onClick={fetchOrder}
            >
              Buscar
            </Button>
          </div>
          {data?.status === "APPROVED" ? (
            <div className={styles.info}>
              <div className={styles.both}>
                <div className={styles.infoAgency}>
                  <h3>Informacion de la empresa</h3>
                  <p>
                    <span>Nombre:</span> {data.booking.agency.name}
                  </p>
                  <p>
                    <span>RIF:</span> {data.booking.agency.rif}
                  </p>
                  <p>
                    <span>Correo electronico:</span> {data.booking.agency.email}
                  </p>
                  <p>
                    <span>Telefono:</span> {data.booking.agency.phone}
                  </p>
                </div>
                <div className={styles.infoTravel}>
                  <h3>Informacion del viaje</h3>
                  <div className={styles.both}>
                    <div>
                      <h4>Salida: </h4>
                      <p>
                        {" "}
                        <span>Estado:</span> {data.booking.departure.state}
                      </p>
                      <p>
                        {" "}
                        <span>Ciudad:</span> {data.booking.departure.city}
                      </p>
                      <p>
                        {" "}
                        <span>Hora:</span>{" "}
                        {data.booking.departure.time.slice(0, 5)}
                      </p>
                      <p>
                        {" "}
                        <span>Fecha:</span> {data.booking.departure.date}
                      </p>
                    </div>
                    <div className={styles.arrival}>
                      <h4>Llegada: </h4>
                      <p>
                        {" "}
                        <span>Estado:</span> {data.booking.arrival.state}
                      </p>
                      <p>
                        {" "}
                        <span>Ciudad:</span> {data.booking.arrival.city}
                      </p>
                      <p>
                        {" "}
                        <span>Hora:</span>{" "}
                        {data.booking.arrival.time.slice(0, 5)}
                      </p>
                      <p>
                        {" "}
                        <span>Fecha:</span> {data.booking.arrival.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.infoCustomer}>
                <h3>Informacion del cliente</h3>
                <p>
                  {" "}
                  <span>Nombre:</span> {data.customerName}
                </p>
                <p>
                  {" "}
                  <span>Correo electronico:</span> {data.customerEmail}
                </p>
                <p>
                  {" "}
                  <span>N de orden de venta:</span> {data.id}
                </p>
                <p>
                  {" "}
                  <span>Total de tickets comprados:</span>{" "}
                  {data.tickets.items.length}
                </p>
                <p>
                  {" "}
                  <span>Total de monto que pago:</span> {data.total}.00$
                </p>
                <p>
                  {" "}
                  <span>Numero de referencia del pago:</span>{" "}
                  {data.payment.reference}
                </p>
              </div>
              <div className={styles.button}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    height: 55,
                    width: 250,
                    marginLeft: 3,
                  }}
                  onClick={fetchReturned}
                >
                  Realizar devolucion
                </Button>
              </div>
            </div>
          ) : data?.status === "RETURNED" ? (
            <div>
              <h5 style={{ color: "red" }}>
                La orden con el id: {data.id} ya se encuentra devuelto
              </h5>
            </div>
          ) : (
            <div>
              <h5 style={{ color: "red" }}>
                No se encuentra la orden con el id: {orderTravel}
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
