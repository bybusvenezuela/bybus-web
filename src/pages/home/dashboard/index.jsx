import React from "react";
import Menu from "@/components/Menu";
import styles from "@/styles/Dashboard.module.css";
import TableAgencies from "@/components/TableAgencies";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "@/components/Card";

const Dashboard = () => {
  const router = useRouter();
  let route = router.pathname.split("/");
  console.log(route.toString);
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
            <Card
              title={`Manage the Trips`}
              link={`/home/agencies/travels`}
              icon={`bx bx-bus`}
            />
            <Card
              title={`Permissions`}
              link={`/home/configuration`}
              icon={`bx bx-lock`}
            />
          </div>
          <div className={styles.agencies}>
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
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
