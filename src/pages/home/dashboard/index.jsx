import React from "react";
import Menu from "@/components/Menu";
import styles from "@/styles/Dashboard.module.css";
import DashOwner from "@/components/dashboard/Owner";
import DashEmployee from "@/components/dashboard/Employee";
import { sharedGetServerSideProps } from "@/hooks/sharedServerProps";
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
const Dashboard = ({ dataResult, userType }) => {
  return (
    <div className={styles.content}>
      <Menu ancho={357.50}/>
      {userType === "owner" ? (
        <DashOwner dataResult={dataResult} userType={userType} />
      ) : (
        userType === "employee" && (
          <DashEmployee dataResult={dataResult} userType={userType} />
        )
      )}
    </div>
  );
};

export async function getServerSideProps({ query, req }) {
  const sharedProps = await sharedGetServerSideProps(query, req);

  if (sharedProps?.error) {
    return {
      redirect: {
        ...sharedProps.error.redirect,
      },
    };
  } else {
    return {
      props: {
        ...sharedProps.props,
      },
    };
  }
}
export default Dashboard;
