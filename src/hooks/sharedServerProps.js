import { withSSRContext } from "aws-amplify";
import * as queries from "@/graphql/custom/queries/home";
import Cookies from "universal-cookie";

export async function sharedGetServerSideProps(query, req) {
  const { type, id } = query;
  const cookies = new Cookies(req.headers.cookie);
  const token = cookies.get("profile");
  const SSR = withSSRContext({ req });
  let result;
  let queryResult;

  try {
    if (token.id !== id || token.rol !== type)
      throw new Error("Error Vuelve a ingrear un perfil");

    switch (type) {
      case "owner":
        queryResult = await SSR.API.graphql({
          query: queries.getAgency,
          variables: {
            id,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })
          .then((r) => (result = r?.data?.getAgency))
          .catch((e) => {
            console.log(e);
            throw new Error("Error en buscar agencia");
          });
        break;
      case "employee":
        queryResult = await SSR.API.graphql({
          query: queries.getEmployee,
          variables: {
            id,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })
          .then((r) => {
            if (r?.data?.getEmployee.type === "OFFICE") {
              result = r?.data?.getEmployee;
            } else {
              throw new Error("PERFIL SIN PERMISOS PARA ACCEDER A PANEL");
            }
          })
          .catch((e) => {
            const { message } = new Error(e);
            throw new Error(message);
          });
        break;
      default:
        throw new Error("Error Vuelve a ingrear un perfil");
    }
    if (!result) {
      throw new Error("Error en Busqueda de Datos");
    } else if (result?.pin !== token.pin) {
      throw new Error("Error Vuelve a ingrear un perfil");
    }
    return {
      props: {
        userType: type,
        dataResult: result,
      },
    };
  } catch (error) {
    return {
      error: {
        redirect: {
          permanent: false,
          destination: `/auth/profiles?error=${error.message}`,
        },
      },
    };
  }
}
