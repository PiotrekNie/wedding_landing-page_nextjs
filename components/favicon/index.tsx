import React from "react";

function Favicon(): JSX.Element {
  return (
    <>
      <link rel='apple-touch-icon' sizes='180x180' href='/images/favicon/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon/favicon-16x16.png' />
      <link rel='mask-icon' href='/images/favicon/safari-pinned-tab.svg' color='#ffd829' />
      <link rel='icon' href='/images/favicon/favicon.ico' />
      <meta name='msapplication-TileColor' content='#ffd829' />
      <meta name='msapplication-config' content='/images/favicon/browserconfig.xml' />
      <meta name='theme-color' content='#ffd829' />
    </>
  );
}

export default Favicon;
