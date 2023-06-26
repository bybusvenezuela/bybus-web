import React, { useState, useEffect } from "react";
import Menu from "@/components/Menu";
import styles from "@/styles/Dashboard.module.css";
import TableAgenciesSubs from "@/components/TableAgenciesSubs";
import TableEmailSubs from '@/components/TableEmailSubs'
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "@/components/Card";
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { API } from 'aws-amplify'
import { listEmailSusbcriptions, listAgencySubscriptions } from '@/graphql/CustomQueries/Dashboard'
const Dashboard = () => {
  const [emailSubs, setEmailSubs] = useState([]);
  const [agencySubs, setAgencySubs] = useState([])
  const router = useRouter();
  let route = router.pathname.split("/");
  console.log(route.toString);
  useEffect(() => {
    fetchEmailSubs();
    fetchAgencySubs();
  }, [])
  const fetchEmailSubs = async () => {
    try {
      const result = await API.graphql({
        query: listEmailSusbcriptions,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })
      console.log("SUBS EMAIL: ", result)
      setEmailSubs(result?.data?.listEmailSusbcriptions?.items)
    } catch (error) {
      setEmailSubs([])
      console.error("ERROR AL CONSULTAR EMAIL SUBS: ", error);
    }
  }
  const fetchAgencySubs = async () => {
    try {
      const result = await API.graphql({
        query: listAgencySubscriptions,
        authMode: "AMAZON_COGNITO_USER_POOLS"
      })
      setAgencySubs(result?.data?.listAgencySubscriptions?.items)
    } catch (error) {
      setAgencySubs([])
      console.error("ERROR AL CONSULTAR AGENCIAS SUBS: ", error);
    }
  }


  return (
    <div className={styles.content}>
      <Menu />
      <div className="container section">
        <div className={styles.pages}>
          <div className={styles.navbar}>
            <Link href={`/home/dashboard`}>
              {route[2] === "dashboard" ? "Dashboard" : "no"}
            </Link>
          </div>
          <div className={styles.panel}>
            <Card
              title={`Add New Agency`}
              link={`/home/agencies/panel`}
              icon={`bx bx-store`}
            />
            {/* <Card
              title={`Manage the Trips`}
              link={`/home/agencies/travels`}
              icon={`bx bx-bus`}
            /> */}
            <Card
              title={`Permissions`}
              link={`/home/configuration`}
              icon={`bx bx-lock`}
            />
          </div>
          {/* <div className={styles.agencies}>
            <div className={styles.title}>
              <h2>List of Agencies</h2>
            </div>
            <TableAgencies />
          </div>
          <div className={styles.users}>
            <div className={styles.title}>
              <h2>List of Users</h2>
            </div>
            <TableAgencies />
          </div> */}
          <div className={styles.users}>
            <div className={styles.title}>
              <h2>Listado de Correos Subscritos</h2>
              <IconButton aria-label="refresh-email" onClick={() => fetchEmailSubs()}>
                <RefreshIcon />
              </IconButton>
            </div>
            <TableEmailSubs rows={emailSubs} />
          </div>
          <div className={styles.users}>
            <div className={styles.title}>
              <h2>Listado de Peticion de Subscricion de Agencias</h2>
              <IconButton aria-label="refresh-agency" onClick={() => fetchAgencySubs()}>
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
