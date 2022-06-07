import React, {
  MouseEvent,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
} from "react";
import Head from "next/head";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import Cookies from "universal-cookie";
import consts from "consts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from "react-responsive";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { GraphQLClient } from "graphql-request";
import Login from "../../components/login";
import BlurImage from "../../components/gallery";
import SCREENS from "../../components/screens/index";
import Cursor from "../../components/coursor/index";
import GetGallery, { GetGalleryItems } from "../../lib/data";
import { MouseContext } from "../../context/mouse-context";
import fluidType from "../../components/fluid-typography";
import Favicon from "../../components/favicon";

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
  data: GalleryItems;
  allImages: GalleryItems;
}

const offset: number = 0;

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

const ModalImage: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  will-change: transform, opacity;

  ${tw`
    w-full h-full fixed top-0 left-0 md:p-8 p-4 flex justify-center items-center bg-white bg-opacity-80 transition-all duration-300 ease-in-out opacity-0 invisible transform scale-0 overflow-hidden pointer-events-none z-50
  `}

  &.open {
    ${tw`
      visible opacity-100 transform scale-100
    `}
  }

  img {
    ${tw`
      w-auto max-w-full h-auto max-h-full block z-10
    `}
  }
`;

const ModalClose: StyledComponent<"button", Record<string, unknown>, {}, never> = styled.button`
  ${tw`
    text-black text-3xl font-bold absolute right-4 top-4 w-9 h-9 z-20 pointer-events-auto
  `}
`;

const ImageContainer: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  ${tw`
    md:h-full max-h-full max-w-fit flex items-center justify-center leading-none shadow-darken relative z-20 pointer-events-auto bg-white
  `}

  &:before {
    content: "Wczytuję...";
    transform: translate(-50%, -50%);

    ${tw`
      absolute left-1/2 top-1/2 text-sm text-gray-200 text-center pointer-events-none tracking-wider
    `}
  }
`;

const Heading4: StyledComponent<"h4", Record<string, unknown>, {}, never> = styled.h4`
  ${fluidType("480px", SCREENS.xl, "40px", "100px")}

  ${tw`
    font-balnes block leading-none mb-4
  `}
`;

const Heading5: StyledComponent<"span", Record<string, unknown>, {}, never> = styled.span`
  ${fluidType("480px", SCREENS.xl, "16px", "24px")}

  ${tw`
    font-serif text-2xl block leading-tight
  `}
`;

export const getStaticProps: () => Promise<{
  props: {
    data: GraphQLClient;
  };
}> = async () => {
  const data: GraphQLClient = await GetGalleryItems(offset);
  const allImages: GraphQLClient = await GetGallery();

  return {
    props: {
      data,
      allImages,
    },
  };
};

function Protected({ hasReadPermission, data, allImages }: FunctionProps) {
  console.log(hasReadPermission);
  let img: HTMLImageElement;
  const [finish, setFinish]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const { weddingGalleries }: GalleryItems = data;
  const headerRef: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const logoRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const galleryRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const galleryContRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const {
    cursorChangeHandler,
  }: { cursorChangeHandler: (t: React.SetStateAction<string>) => void } = useContext(MouseContext);
  const [images, setImages]: [Image[], React.Dispatch<React.SetStateAction<Image[]>>] =
    useState(weddingGalleries);
  const [hasMore, setHasMore]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(true);
  const [desktop, setDesktop]: [
    boolean | undefined,
    Dispatch<SetStateAction<boolean | undefined>>,
  ] = useState();
  const isDesktop: boolean = useMediaQuery({ minWidth: SCREENS.md });
  const [model, setModel]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [tempImgSrc, setTempImgSrc]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState<string>("");
  const getMoreImages: () => Promise<void> = async () => {
    const galleryData: GraphQLClient = await GetGalleryItems(images.length);

    const { weddingGalleries }: GalleryItems = galleryData as unknown as GalleryItems; // eslint-disable-line no-shadow

    setImages((imageItems: Image[]) => [...imageItems, ...weddingGalleries]);
  };
  const getURL: (url: string) => Promise<unknown> = async (url: string) => {
    setTempImgSrc(url);
    setModel(true);

    async function loadImage(imageUrl: string) {
      const imageLoadPromise: Promise<unknown> = new Promise(
        (resolve: (value: unknown) => void) => {
          img = new window.Image();
          img.onload = resolve;
          img.src = imageUrl;
        },
      );

      await imageLoadPromise;

      return img;
    }

    await loadImage(url);

    setLoading(true);
  };

  useEffect(() => {
    setHasMore(allImages.weddingGalleries.length > images.length);
  }, [images]);

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

  const router: NextRouter = useRouter();

  const LogOut: (ev: MouseEvent<HTMLButtonElement>) => void = (
    ev: MouseEvent<HTMLButtonElement>,
  ) => {
    ev.preventDefault();

    const cookies: Cookies = new Cookies();

    cookies.remove(consts.SiteReadCookie, { path: "/" });
    window.location.href = "/galeria";
  };

  // if (!hasReadPermission) {
  //   return (
  //     <>
  //       {desktop && <Cursor />}
  //       <Head>
  //         <title>Dela &amp; Piotrek – Zaloguj się</title>
  //         <meta name='robots' content='noindex' />
  //         <Favicon />
  //       </Head>
  //       <Login redirectPath={router.asPath} />
  //     </>
  //   );
  // }

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
      <MainContainer className={finish ? "" : "overflow-hidden max-h-screen"}>
        <section ref={galleryContRef} className='gallery md:pt-24 pt-16 relative z-20'>
          <div className='container max-w-fhd px-2 md:px-4 sm:pb-0 pb-12' ref={galleryRef}>
            <InfiniteScroll
              next={getMoreImages}
              hasMore={hasMore}
              loader={<h4>Wczytuję...</h4>}
              dataLength={images.length}
              endMessage={
                <div className='text-center py-6 col-span-3'>
                  <Heading4>To by było na tyle</Heading4>
                  <Heading5>Do&nbsp;zobaczenia</Heading5>
                </div>
              }
              className='grid md:grid-cols-3 sm:grid-cols-2 gap-4'>
              {images?.map((item: Image) => (
                <BlurImage key={item.photos.id} image={item} imageUrl={getURL} />
              ))}
            </InfiniteScroll>
          </div>
        </section>
        <ModalImage className={model ? "model open" : "model"}>
          <ModalClose
            onClick={() => {
              setModel(false);
              setLoading(false);
            }}
            onMouseEnter={() => cursorChangeHandler("hovered")}
            onMouseLeave={() => cursorChangeHandler("")}>
            &times;
          </ModalClose>
          <div
            onClick={() => {
              setModel(false);
              setLoading(false);
            }}
            aria-hidden='true'
            className='block absolute w-full h-full top-0 left-0 z-0 pointer-events-auto'
          />
          <ImageContainer>
            <img
              src={tempImgSrc}
              alt='temporary img'
              className={loading ? "opacity-100 visible" : "opacity-0 invisible"}
            />
          </ImageContainer>
        </ModalImage>
      </MainContainer>
    </>
  );
}

export default Protected;
