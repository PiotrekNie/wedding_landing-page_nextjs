import React from "react";
import "../src/styles/index.scss";
import { AppProps } from "next/app";
import Script from "next/script";
import MouseContextProvider from "../context/mouse-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MouseContextProvider>
      <Script src='https://www.googletagmanager.com/gtm.js?id=GTM-TXBWHJ8' />
      <Component {...pageProps} />
    </MouseContextProvider>
  );
}

export default MyApp;
