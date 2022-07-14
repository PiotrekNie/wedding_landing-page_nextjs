import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Head from "next/head";
import Image from "next/image";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Cursor from "../../components/coursor";
import Favicon from "../../components/favicon";
import SCREENS from "../../components/screens";
import Header from "../../components/header";
import { MouseContext } from "../../context/mouse-context";

gsap.registerPlugin(ScrollTrigger);

const MainContainer: StyledComponent<"main", Record<string, unknown>, {}, never> = styled.main`
  ${tw`
  relative flex justify-center md:py-32 py-16 container
`}
`;

const IframeContainer: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  padding-bottom: 56.25%;

  ${tw`
    relative h-0 overflow-hidden md:w-9/12 w-full
    `}

  @media (min-width: ${SCREENS.md}) {
    padding-bottom: 42.25%;
  }

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
    // GSAP: Header Logo
    const navAnimation: gsap.core.Tween = gsap.to(logoRef.current, {
      scale: 0.6,
      duration: 0.5,
      ease: "Power2.easeOut",
      paused: true,
    });

    ScrollTrigger.create({
      trigger: document.body,
      start: "100px top",
      end: "bottom bottom",
      onUpdate: ({ direction, isActive }: { direction: number; isActive: boolean }) => {
        if (direction === -1) {
          navAnimation.reverse();
        }
        if (direction === 1) {
          navAnimation.play();
        }
        if (direction === 1 && isActive) {
          navAnimation.play();
        }
      },
    });

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
            src='https://www.youtube.com/embed/H1uOqct9xtA'
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
