import React, { useEffect, useState } from "react";
import Menu from "@/components/Menu";
import styles from "@/styles/Dashboard.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "@/components/Card";
import ModalOffice from "@/components/ModalOffice";
import ModalTravel from "@/components/ModalTravel";
import ModalEmployee from "@/components/ModalEmployee";
import { useUser } from "@/context/UserContext";
import { Auth, API, withSSRContext } from "aws-amplify";
import * as queries from "@/graphql/custom/queries/home";
import TableEmployees from "@/components/TableEmployees";
import TableOffices from "@/components/TableOffices";
import ModalTransport from "@/components/ModalTransport";

const Dashboard = ({ dataResult, userType }) => {
  const [office, setOffice] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [travels, setTravels] = useState(false);
  const [transport, setTransport] = useState(false);
  const [data, setData] = useState({});

  const Agency = async () => {
    const user = await Auth.currentAuthenticatedUser({});
    // const list = await API.graphql({
    //   query: queries.getAgency,
    //   authMode: "AMAZON_COGNITO_USER_POOLS",
    //   variables: {
    //     id: user?.attributes?.["custom:agencyID"],
    //   },
    // });
    // setData(list.data.getAgency);
    setData(null);
  };

  const openOffice = () => {
    setOffice(true);
  };
  const openEmployee = () => {
    setEmployee(true);
  };
  const openTravels = () => {
    setTravels(true);
  };
  const openTransport = () => {
    setTransport(true);
  };
  useEffect(() => {
    if (userType === "owner") Agency();
  }, [office, employee]);

  return (
    <div className={styles.content}>
      <Menu />
      <div className={styles.section}>
        <div className={styles.pages}>
          <div className={styles.panel}>
            {userType === "owner" && (
              <>
                <Card
                  title={`Agregar una nueva oficina`}
                  onHandle={openOffice}
                  icon={`bx bx-store`}
                />
                <Card
                  title={`Agregar un nuevo empleado`}
                  onHandle={openEmployee}
                  icon={`bx bx-bus`}
                />
              </>
            )}
            <Card
              title={`Crear un nuevo viaje`}
              onHandle={openTravels}
              icon={`bx bx-lock`}
            />
            <Card
              title={`Agregar un transporte`}
              onHandle={openTransport}
              icon={`bx bx-lock`}
            />
          </div>
          <div className={styles.agencies}>
            <div className={styles.title}>
              <h2>Lista de Oficinas</h2>
            </div>
            {data?.employees?.items && (
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
          {data?.officies?.items && (
            <ModalEmployee
              offices={data?.officies?.items}
              open={employee}
              close={() => setEmployee(!employee)}
            />
          )}
          {data?.officies?.items[0] && (
            <ModalTravel
              offices={data?.officies?.items[0]}
              open={travels}
              close={() => setTravels(!travels)}
            />
          )}
          {data?.officies?.items && (
            <ModalTransport
              offices={data?.officies?.items}
              open={transport}
              close={() => setTransport(!transport)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ query, req }) {
  console.log(query);
  const { type, pin, id } = query;
  const SSR = withSSRContext({ req });
  let result;
  let queryResult;
  try {
    switch (type) {
      case "owner":
        queryResult = await SSR.API.graphql({
          query: queries.getAgency,
          variables: {
            id,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        result = queryResult?.data?.getAgency;
        break;
      case "employee":
        queryResult = await SSR.API.graphql({
          query: queries.getEmployee,
          variables: {
            id,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        result = queryResult?.data?.getEmployee;
        break;
      default:
        throw new Error("¡Este es un error forzado!");
    }
    if (!result) {
      throw new Error("Error en Busqueda de Datos");
    } else if (result?.pin !== pin) {
      throw new Error("Error Vuelve a ingrear un perfil");
    }

    return {
      props: {
        userType: type,
        dataResult: result,
      },
    };
  } catch (error) {
    const { message } = error;
    console.error(error);
    return {
      redirect: {
        permanent: false,
        destination: `/auth/profiles?error=${message}`,
      },
      props: {},
    };
  }
}

export default Dashboard;
