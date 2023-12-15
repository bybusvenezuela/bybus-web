import React from "react";
import Menu from "@/components/Menu";
import styles from "@/styles/Home.module.css";

const Pages = (props) => {
  return (
    <div className={styles.content}>
      <Menu />
      <div>Pages</div>
    </div>
  );
};

export async function getServerSideProps({ query, req }) {
  const sharedProps = await sharedGetServerSideProps();
  return {
    props: {
      ...sharedProps.props,
    },
  };
}

/*
export async function getServerSideProps({ query, req }) {
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
*/

export default Pages;
