import React, { useEffect, useState } from "react";
import styles from "@/styles/Dashboard.module.css";
import Card from "@/components/Card";
import ModalOffice from "@/components/ModalOffice";
import ModalEmployee from "@/components/ModalEmployee";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "@/graphql/custom/queries/home";
import * as subscriptions from "@/graphql/custom/subscriptions/home";
import TableEmployees from "@/components/TableEmployees";
import TableOffices from "@/components/TableOffices";

const Dashboard = ({ dataResult, userType }) => {
  const [office, setOffice] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [data, setData] = useState(dataResult);
  const [userT, setUserT] = useState(userType);

  const openOffice = () => {
    setOffice(true);
  };
  const openEmployee = () => {
    setEmployee(true);
  };

  useEffect(() => {
    if (!office) Agency();
  }, [office, employee]);

  const Agency = async () => {
    const user = await Auth.currentAuthenticatedUser({});
    const list = await API.graphql({
      query: queries.getAgency,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: user?.attributes?.["custom:agencyID"],
      },
    });
    setData(list?.data?.getAgency);
  };
  return (
    data && (
      <div className={styles.section}>
        <div className={styles.pages}>
          <div className={styles.panel}>
            {userT === "owner" && (
              <>
                <Card
                  title={`Agregar una nueva oficina`}
                  onHandle={openOffice}
                  icon={`bx bx-buildings`}
                />
                <Card
                  title={`Agregar un nuevo empleado`}
                  onHandle={openEmployee}
                  icon={`bx bxs-user-badge`}
                />
              </>
            )}
          </div>

          <div className={styles.agencies}>
            <div className={styles.title}>
              <h2>Lista de Oficinas</h2>
            </div>
            {data?.officies?.items && (
              <TableOffices rows={data?.officies?.items} />
            )}
          </div>
          <div className={styles.users}>
            <div className={styles.title}>
              <h2>Lista de Empleados</h2>
            </div>
            {data?.employees?.items && (
              <TableEmployees rows={data?.employees?.items} />
            )}
          </div>
          <ModalOffice open={office} close={() => setOffice(!office)} />
          {data?.officies?.items?.length > 0 && (
            <ModalEmployee
              open={employee}
              close={() => setEmployee(!employee)}
              offices={data?.officies?.items}
            />
          )}
        </div>
      </div>
    )
  );
};

export default Dashboard;
