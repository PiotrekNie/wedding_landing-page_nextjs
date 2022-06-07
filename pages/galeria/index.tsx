import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from "react";
import Head from "next/head";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import consts from "consts";
import Cookies from "universal-cookie";
import Login from "../../components/login";
import Favicon from "../../components/favicon";
import Cursor from "../../components/coursor/index";
import SCREENS from "../../components/screens";
import { MouseContext } from "../../context/mouse-context";

interface Props {
  hasReadPermission: boolean;
}

const Header: StyledComponent<"header", Record<string, unknown>, {}, never> = styled.header`
  transform: translateX(-50%);

  ${tw`
    fixed z-50 w-full top-0 left-1/2 flex md:justify-center justify-between items-center pointer-events-none md:p-4 p-2
  `}

  a,
  button {
    ${tw`
      pointer-events-auto
    `}
  }
`;

export default function Protected({ hasReadPermission }: Props) {
  const isDesktop: boolean = useMediaQuery({ minWidth: SCREENS.md });
  const [desktop, setDesktop]: [
    boolean | undefined,
    Dispatch<SetStateAction<boolean | undefined>>,
  ] = useState();
  const headerRef: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const logoRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDesktop(isDesktop);

    // GSAP: Header Logo
    // const navAnimation: gsap.core.Tween = gsap.to(logoRef.current, {
    //   scale: 0.6,
    //   duration: 0.5,
    //   ease: "Power2.easeOut",
    //   paused: true,
    // });
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

  const {
    cursorChangeHandler,
  }: { cursorChangeHandler: (t: React.SetStateAction<string>) => void } = useContext(MouseContext);
  const LogOut: (ev: MouseEvent<HTMLButtonElement>) => void = (
    ev: MouseEvent<HTMLButtonElement>,
  ) => {
    ev.preventDefault();

    const cookies: Cookies = new Cookies();

    cookies.remove(consts.SiteReadCookie, { path: "/" });
    window.location.href = "/galeria";
  };

  return (
    <>
      {desktop && <Cursor />}
      <Head>
        <title>Dela &amp; Piotrek – Dziękujemy za wspólną zabawę :&#41;</title>
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
        <button
          className='font-bold hover:underline'
          onClick={(ev: MouseEvent<HTMLButtonElement>) => LogOut(ev)}
          onMouseEnter={() => cursorChangeHandler("hovered")}
          onMouseLeave={() => cursorChangeHandler("")}
          role='link'
          type='button'>
          Wyloguj się
        </button>
      </Header>
    </>
  );
}
