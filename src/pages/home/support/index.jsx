import Menu from "@/components/Menu";
import React, { useState } from "react";
import styles from "@/styles/Support.module.css";
import { Button, TextField } from "@mui/material";
import * as queries from "@/graphql/custom/queries";
import { Auth, API } from "aws-amplify";

const Support = () => {
  const [orderTravel, setOrderTravel] = useState("");

  const fetchOrder = async () => {
    try {
      const result = await API.graphql({
        query: queries.getOrderDetail,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          // filter: {
            id:  orderTravel
          // }
        },
      });
      console.log(result.data.getOrderDetail)
    } catch (error) {
      console.error(error);
    }
  };

  console.log(orderTravel)
  return (
    <div className={styles.content}>
      <Menu />
      <div className="container section">
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
      </div>
    </div>
  );
};

export default Support;
