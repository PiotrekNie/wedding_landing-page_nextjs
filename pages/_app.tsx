import React from "react";
import "../src/styles/index.scss";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import Cookies from "universal-cookie";
import consts from "consts";
import MouseContextProvider from "../context/mouse-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MouseContextProvider>
      <Component {...pageProps} />
    </MouseContextProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);
  const cookies: Cookies = new Cookies(appContext?.ctx?.req?.headers?.cookie);
  const password: string = cookies.get(consts.SiteReadCookie) ?? "";

  if (password === "dobrazabawa2022") {
    appProps.pageProps.hasReadPermission = true;
  }

  return { ...appProps };
};

export default MyApp;
