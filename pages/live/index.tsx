import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Head from "next/head";
import Image from "next/image";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import Cursor from "../../components/coursor";
import Favicon from "../../components/favicon";
import SCREENS from "../../components/screens";
import Header from "../../components/header";
import { MouseContext } from "../../context/mouse-context";

const MainContainer: StyledComponent<"main", Record<string, unknown>, {}, never> = styled.main`
  ${tw`
  relative flex justify-center py-32 container
`}
`;

const IframeContainer: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  padding-bottom: 42.25%;

  ${tw`
    relative h-0 overflow-hidden w-9/12
  `}

  iframe {
    ${tw`
      absolute top-0 left-0 w-full h-full
    `}
  }
`;

function Live() {
  const {
    cursorChangeHandler,
  }: { cursorChangeHandler: (t: React.SetStateAction<string>) => void } = useContext(MouseContext);
  const [desktop, setDesktop]: [
    boolean | undefined,
    Dispatch<SetStateAction<boolean | undefined>>,
  ] = useState();
  const isDesktop: boolean = useMediaQuery({ minWidth: SCREENS.md });
  const headerRef: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const logoRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDesktop(isDesktop);
  }, []);

  return (
    <>
      {desktop && <Cursor />}
      <Head>
        <title>Dela &amp; Piotrek – Oglądaj relację live :&#41;</title>
        <meta name='robots' content='noindex' />
        <Favicon />
      </Head>

      <Header ref={headerRef}>
        <div ref={logoRef} className='md:mx-auto md:w-auto w-14'>
          <a
            href='/'
            onMouseEnter={() => cursorChangeHandler("hovered")}
            onMouseLeave={() => cursorChangeHandler("")}>
            <Image src='/images/logo.svg' width='80' height='65' alt='Dela&amp;Piotrek' />
          </a>
        </div>
      </Header>
      <MainContainer>
        <IframeContainer>
          <iframe
            src='https://www.youtube.com/embed/pCdoFZ76p3k'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </IframeContainer>
      </MainContainer>
    </>
  );
}

export default Live;
