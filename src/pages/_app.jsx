import Menu from "@/components/Menu";
import "@/styles/globals.css";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuProvider } from "@/context/MenuContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFCE48",
      darker: "#FFCE48",
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

const App = ({ Component, pageProps }) => (
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
);

export default App;
