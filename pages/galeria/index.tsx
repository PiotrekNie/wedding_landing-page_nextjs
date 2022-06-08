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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import tw from "twin.macro";
import consts from "consts";
import Cookies from "universal-cookie";
// import InfiniteScroll from "react-infinite-scroll-component";
import { GraphQLClient } from "graphql-request";
import Login from "../../components/login";
import Favicon from "../../components/favicon";
import Cursor from "../../components/coursor/index";
import SCREENS from "../../components/screens";
import GetGallery, { GetGalleryItems } from "../../lib/data";
// import BlurImage from "../../components/gallery";
import { MouseContext } from "../../context/mouse-context";
import fluidType from "../../components/fluid-typography";

gsap.registerPlugin(ScrollTrigger);

interface Image {
  photos: {
    id: string;
    url: string;
    fileName: string;
    height: number;
    width: number;
  };
}

export interface GalleryItems {
  weddingGalleries: Image[];
}

interface FunctionProps {
  hasReadPermission: boolean;
}

export const getStaticProps: () => Promise<{
  props: {
    data: GraphQLClient;
  };
}> = async () => {
  const offset: number = 0;
  const data: GraphQLClient = await GetGalleryItems(offset);

  return {
    props: {
      data,
    },
  };
};

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

const MainContainer: StyledComponent<"main", Record<string, unknown>, {}, never> = styled.main`
  ${tw`
  relative bg-black
`}

  &:before,
&:after {
    transform: translate(-50%, -50%);

    ${tw`
  text-center fixed left-1/2 top-1/2  w-full h-full flex items-center justify-center pointer-events-none leading-none text-gray-300
  `}
  }

  &:before {
    content: "Dziękujemy za wspólną zabawę!";

    ${tw`
     font-serif md:pb-20 pb-10
  `}

    ${fluidType("480px", SCREENS.xl, "18px", "45px")}
  }

  &:after {
    content: "Dela i Piotrek";

    ${tw`
     font-balnes md:pt-20 pt-10
  `}

    ${fluidType("480px", SCREENS.xl, "36px", "84px")}
  }
`;

// const ModalImage: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
//   will-change: transform, opacity;

//   ${tw`
//     w-full h-full fixed top-0 left-0 md:p-8 p-4 flex justify-center items-center bg-white bg-opacity-80 transition-all duration-300 ease-in-out opacity-0 invisible transform scale-0 overflow-hidden pointer-events-none z-50
//   `}

//   &.open {
//     ${tw`
//       visible opacity-100 transform scale-100
//     `}
//   }

//   img {
//     ${tw`
//       w-auto max-w-full h-auto max-h-full block z-10
//     `}
//   }
// `;

// const ModalClose: StyledComponent<"button", Record<string, unknown>, {}, never> = styled.button`
//   ${tw`
//     text-black text-3xl font-bold absolute right-4 top-4 w-9 h-9 z-20 pointer-events-auto
//   `}
// `;

// const ImageContainer: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
//   ${tw`
//     md:h-full max-h-full max-w-fit flex items-center justify-center leading-none shadow-darken relative z-20 pointer-events-auto bg-white
//   `}

//   &:before {
//     content: "Wczytuję...";
//     transform: translate(-50%, -50%);

//     ${tw`
//       absolute left-1/2 top-1/2 text-sm text-gray-200 text-center pointer-events-none tracking-wider
//     `}
//   }
// `;

// const Heading4: StyledComponent<"h4", Record<string, unknown>, {}, never> = styled.h4`
//   ${fluidType("480px", SCREENS.xl, "40px", "100px")}

//   ${tw`
//     font-balnes block leading-none mb-4
//   `}
// `;

// const Heading5: StyledComponent<"span", Record<string, unknown>, {}, never> = styled.span`
//   ${fluidType("480px", SCREENS.xl, "16px", "24px")}

//   ${tw`
//     font-serif text-2xl block leading-tight
//   `} //
// `;

export default function Protected({ hasReadPermission }: FunctionProps) {
  // let img: HTMLImageElement;

  const isDesktop: boolean = useMediaQuery({ minWidth: SCREENS.md });
  const [desktop, setDesktop]: [
    boolean | undefined,
    Dispatch<SetStateAction<boolean | undefined>>,
  ] = useState();
  const [finish, setFinish]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  // const { weddingGalleries }: GalleryItems = data;
  // const [images, setImages]: [Image[], React.Dispatch<React.SetStateAction<Image[]>>] =
  //   useState(weddingGalleries);
  // const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] =
  //   useState<boolean>(false);
  // const [tempImgSrc, setTempImgSrc]: [string, React.Dispatch<React.SetStateAction<string>>] =
  //   useState<string>("");
  // const [model, setModel]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
  //   useState<boolean>(false);
  // const [hasMore, setHasMore]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
  //   useState<boolean>(true);
  const galleryRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const headerRef: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const logoRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const galleryContRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  // const getMoreImages: () => Promise<void> = async () => {
  //   const galleryData: GraphQLClient = await GetGalleryItems(images.length);

  //   const { weddingGalleries }: GalleryItems = galleryData as unknown as GalleryItems; // eslint-disable-line no-shadow
  //   console.log(images);
  //   setImages((imageItems: Image[]) => [...imageItems, ...weddingGalleries]);
  // };

  useEffect(() => {
    const galleryContainer: HTMLDivElement = galleryRef.current as HTMLDivElement;
    const infiniteScrollItems: HTMLDivElement = galleryContainer?.firstElementChild
      ?.firstElementChild as HTMLDivElement;

    setDesktop(isDesktop);

    // GSAP: Header
    gsap.fromTo(
      headerRef.current,
      { y: "-=100" },
      { y: "0", duration: 1, ease: "Power2.easeOut", delay: 4.25 },
    );

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

    // GSAP: Gallery Items
    gsap.fromTo(
      infiniteScrollItems?.children,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        delay: 4.25,
      },
    );

    // GSAP: Gallery Container
    gsap.fromTo(
      galleryContRef?.current,
      { y: "+=100%" },
      {
        y: 0,
        duration: 1.5,
        delay: 3,
        onComplete: () => setFinish(true),
      },
    );
  }, []);

  // useEffect(() => {
  //   setHasMore(allImages.weddingGalleries.length > images.length);
  // }, [images]);

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

      <MainContainer className={finish ? "" : "overflow-hidden max-h-screen"} />
    </>
  );
}
