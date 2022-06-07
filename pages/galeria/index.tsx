import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import Login from "../../components/login";
import Favicon from "../../components/favicon";
import Cursor from "../../components/coursor/index";
import SCREENS from "../../components/screens";

interface Props {
  hasReadPermission: boolean;
}

export default function Protected({ hasReadPermission }: Props) {
  const isDesktop: boolean = useMediaQuery({ minWidth: SCREENS.md });
  const [desktop, setDesktop]: [
    boolean | undefined,
    Dispatch<SetStateAction<boolean | undefined>>,
  ] = useState();

  useEffect(() => {
    setDesktop(isDesktop);
  }, []);

  if (!hasReadPermission) {
    const router: NextRouter = useRouter();

    return (
      <>
        {desktop && <Cursor />}
        <Head>
          <title>Dela &amp; Piotrek – Zaloguj się</title>
          <meta name='robots' content='noindex' />
          <Favicon />
        </Head>
        <Login redirectPath={router.asPath} />
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>Protected Page</title>
      </Head>

      <main>I am supposed to be protected.</main>
    </div>
  );
}
