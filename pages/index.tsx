import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import SwiperCore, { Autoplay } from "swiper";
// Partials
import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SectionVideo from "../components/videoPlayer";
import Cursor from "../components/coursor/index";
import SCREENS from "../components/screens/index";
import Favicon from "../components/favicon";

// Images
SwiperCore.use([Autoplay]);

gsap.registerPlugin(ScrollTrigger);

export interface Image {
  id: string;
  url: string;
  fileName: string;
}

const Section: StyledComponent<"section", Record<string, unknown>, {}, never> = styled.section`
  ${tw`
    container max-w-fhd px-2 md:px-4
  `}
`;

export default function Home() {
  const wrapper: React.MutableRefObject<HTMLHeadingElement[]> = useRef<HTMLHeadingElement[]>([]);
  const sectionWrapper: React.MutableRefObject<HTMLHeadingElement[]> = useRef<HTMLHeadingElement[]>(
    [],
  );
  const isDesktop: boolean = useMediaQuery({ minWidth: SCREENS.md });
  const [desktop, setDesktop]: [
    boolean | undefined,
    Dispatch<SetStateAction<boolean | undefined>>,
  ] = useState();

  useEffect(() => {
    // GSAP
    const sectionArray: HTMLHeadingElement[] = sectionWrapper.current as HTMLHeadingElement[];
    const wrapperCurrent: HTMLHeadingElement[] = wrapper.current as HTMLHeadingElement[];

    sectionArray.forEach((section: HTMLElement) => {
      gsap.fromTo(
        section,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            onEnter: () => {
              section.classList.add("show");
            },
          },
        },
      );
    });

    wrapperCurrent.forEach((element: HTMLElement) => {
      gsap.fromTo(
        element?.children,
        { y: "+=75", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          scrollTrigger: {
            trigger: element,
            start: "top center",
          },
        },
      );
    });

    setDesktop(isDesktop);
  }, []);

  return (
    <>
      {desktop && <Cursor />}
      <Head>
        <title>Delfina&amp;Piotek</title>
        <meta name='description' content='Zapraszamy :)' />
        <meta name='robots' content='noindex' />
        <Favicon />
      </Head>

      <main>
        <Section className='video xxl:pt-0 xl:pt-0 pt-16 pb-24 h-screen' id='video'>
          <div className='flex justify-center h-screen items-center'>
            <div className='md:w-8/12 w-full relative text-center'>
              <SectionVideo />
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
