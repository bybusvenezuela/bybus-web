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
} from "@/graphql/queries";

const Dashboard = () => {
  const [emailSubs, setEmailSubs] = useState([]);
  const [agencySubs, setAgencySubs] = useState([]);
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

      const user = await Auth.currentAuthenticatedUser();
      console.log("attributes:", user.attributes);
    } catch (error) {
      setAgencySubs([]);
      console.error("ERROR AL CONSULTAR AGENCIAS SUBS: ", error);
    }
  };
  useEffect(() => {
    fetchEmailSubs();
    fetchAgencySubs();
  }, []);

  return (
    <div className={styles.content}>
      <Menu />
      <div className="container section">
        <div className={styles.pages}>
          <div className={styles.panel}>
            <Card
              title={`Add New Agency`}
              link={`/home/agencies/panel`}
              icon={`bx bx-store`}
            />
            <Card
              title={`Permissions`}
              link={`/home/configuration`}
              icon={`bx bx-lock`}
            />
          </div>
          <div className={styles.users}>
            <div className={styles.title}>
              <h2>Listado de Correos Suscritos</h2>
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
              <h2>Listado de Peticion de Suscripcion de Agencias</h2>
              <IconButton
                aria-label="refresh-agency"
                onClick={() => fetchAgencySubs()}
              >
                <RefreshIcon />
              </IconButton>
            </div>
            <TableAgenciesSubs rows={agencySubs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
