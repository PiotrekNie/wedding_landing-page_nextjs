import React from "react";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import Login from "../../components/login";

interface Props {
  hasReadPermission: boolean;
}

export default function Protected({ hasReadPermission }: Props) {
  const router: NextRouter = useRouter();

  if (!hasReadPermission) {
    return <Login redirectPath={router.asPath} />;
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
