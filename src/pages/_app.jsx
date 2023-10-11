import React, { useState, useEffect } from 'react'
import Menu from "@/components/Menu";
import "@/styles/globals.css";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuProvider } from "@/context/MenuContext";
// AMplify 
import { Amplify, Auth, Hub } from 'aws-amplify'
import awsExports from '@/aws-exports'
// router
import { useRouter } from 'next/router'

const theme = createTheme({
  palette: {
    primary: {
      main: "#0077B6",
      darker: "#0077B6",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFFFFF",
      darker: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: `Montserrat, sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
Amplify.configure({ ...awsExports, ssr: true });
const App = ({ Component, pageProps }) => {
  const [isUserAuth, setIsUserAuth] = useState(false)
  const router = useRouter();

  useEffect(() => {
    // crear subscripcion
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log("HUB: ", event)
      switch (event) {
        case "signIn":
          checkUser();
          break;
        case "signIn_failure":
          break;
        case "signOut":
          router.push({ pathname: `/` })
          break;
        default:
          break;
      }

    });
    checkUser();
    return unsubscribe;
  }, [])

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      if (user?.signInUserSession.accessToken.payload['cognito:groups'] === undefined) {
        await Auth.signOut();
        alert("USUARIO NO AUTORIZADO")
        return
      }
      const userGroups = user.signInUserSession.accessToken.payload['cognito:groups'];

      if (userGroups.includes('admin') || userGroups.includes('sp')) {
        router.push({ pathname: `/home/dashboard` })
      } else {
        alert("USUARIO NO AUTORIZADO")
        await Auth.signOut();
      }
    } catch (error) {

      console.error("Error: ", error);
    }
  }
  return (
    <>
      <Head>
        <title>ByBus</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <MenuProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </MenuProvider>
    </>
  )

};

export default App;
