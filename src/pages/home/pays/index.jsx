import React, { useEffect, useState } from "react";
import Menu from "@/components/Menu";
import styles from "@/styles/Home.module.css";
import TableOrders from "@/components/TableOrders";
import * as queries from "@/graphql/custom/queries";
import * as mutation from "@/graphql/custom/mutations";
import { Auth, API } from "aws-amplify";

const Pays = () => {
  const [data, setData] = useState([]);
  const fetchOrders = async () => {
    const result = await API.graphql({
      query: queries.listOrderDetails,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    let filter = result.data.listOrderDetails.items.filter(
      (item) => item.status === "PENDIENTE"
    );
    setData(filter);
    console.log(filter);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={styles.content}>
      <Menu ancho={249} />
      <div
        style={{
          padding: 80,
        }}
      >
        <div >
          <h1 style={{ textAlign: "center", marginBottom: 30, marginTop: -20 }}>
            Aceptar pagos
          </h1>
          <div style={{ textAlign: "center" }}>
            Recuerda que este es la seccion para aceptar las ordenes pendientes
            provenientes de la app de viajes y asi cambiar el estatus de las
            ordenes de los clientes a 'PAGADO'. Recuerda comprobar la
            informacion correctamente antes de aceptar una orden o cancelarla.
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
          }}
        >
          <TableOrders rows={data} update={() => fetchOrders()} />
        </div>
      </div>
    </div>
  );
};

export default Pays;
