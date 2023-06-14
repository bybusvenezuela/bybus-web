import "@/styles/globals.css";
import Head from "next/head";
import { Amplify } from 'aws-amplify'
import awsExports from '@/aws-exports'

Amplify.configure({ ...awsExports, ssr: true });

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>BYBUS VENEZUELA</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
