import React from "react";
import "../src/styles/index.scss";
import { AppProps } from "next/app";
import MouseContextProvider from "../context/mouse-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MouseContextProvider>
      <Component {...pageProps} />
    </MouseContextProvider>
  );
}

export default MyApp;
