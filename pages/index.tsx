import React, { useState, useRef, useEffect, Dispatch, SetStateAction, useContext } from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";
import { GraphQLClient } from "graphql-request";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import SwiperCore, { Virtual, Autoplay, Navigation } from "swiper";
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
// Partials
import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import GetGallery from "../lib/data";
import Map from "./components/googleMaps";
import TimeLine from "./components/timeLine";
import SectionVideo from "./components/videoPlayer";
import SectionFooter from "./components/footer";
import Cursor from "../components/coursor/index";
import SCREENS from "../components/screens/index";
import { MouseContext } from "../context/mouse-context";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/virtual";
import "swiper/css/autoplay";
import "swiper/css/navigation";

// Images
SwiperCore.use([Autoplay]);

gsap.registerPlugin(ScrollTrigger);

interface Question {
  id: string;
  question: string;
  answer: {
    raw: {
      children: RichTextContent;
    };
  };
}

export interface Gallery {
  id: string;
  images: {
    id: string;
    url: string;
    fileName: string;
  }[];
}

export interface Sections {
  qas: Question[];
  galleries: Gallery[];
}

export interface Image {
  id: string;
  url: string;
  fileName: string;
}

const SwiperItem: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  ${tw`
    w-full relative
  `}

  img {
    ${tw`
      w-full h-full object-cover
    `}
  }
`;

const Section: StyledComponent<"section", Record<string, unknown>, {}, never> = styled.section`
  ${tw`
    container max-w-fhd px-2 md:px-4
  `}
`;

const Subtitle: StyledComponent<"h2", Record<string, unknown>, {}, never> = styled.h2`
  span {
    ${tw`
      block
    `}
  }
`;

export const getStaticProps: () => Promise<{
  props: {
    data: GraphQLClient;
  };
}> = async () => {
  const data: GraphQLClient = await GetGallery();

  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }: { data: Sections }) {
  const {
    cursorChangeHandler,
  }: { cursorChangeHandler: (t: React.SetStateAction<string>) => void } = useContext(MouseContext);
  const wrapper: React.MutableRefObject<HTMLHeadingElement[]> = useRef<HTMLHeadingElement[]>([]);
  const subtitleWrapper: React.MutableRefObject<HTMLHeadingElement[]> = useRef<
    HTMLHeadingElement[]
  >([]);
  const sectionWrapper: React.MutableRefObject<HTMLHeadingElement[]> = useRef<HTMLHeadingElement[]>(
    [],
  );
  const faqWrapper: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { qas, galleries }: Sections = data;
  const [gallery, setGallery]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);
  const isDesktop: boolean = useMediaQuery({ minWidth: SCREENS.md });
  const [desktop, setDesktop]: [
    boolean | undefined,
    Dispatch<SetStateAction<boolean | undefined>>,
  ] = useState();
  const galleryArray: Image[] = [];

  useEffect(() => {
    // GSAP
    const node: HTMLDivElement = faqWrapper.current as HTMLDivElement;
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

    gsap.fromTo(
      node?.children,
      { y: "+=75", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: node,
          start: "top center",
        },
      },
    );

    const subtitleArray: HTMLHeadingElement[] = subtitleWrapper.current as HTMLHeadingElement[];

    subtitleArray.forEach((item: HTMLElement) => {
      const text: Element[] = Array.from(item.children);

      text.forEach((child: Element, index: number) => {
        const spanElement: HTMLElement = child.firstElementChild as HTMLElement;

        gsap.fromTo(
          spanElement,
          { y: "+=75", opacity: 0, ease: "power3.easeOut" },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: text,
              start: "top center",
            },
          },
        );
      });
    });

    setDesktop(isDesktop);
  }, []);

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      const rand: number = Math.floor(Math.random() * (galleries.length - 1 - 0 + 1)) + 0;

      setGallery(rand);

      return rand;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const elements: Element[] = Array.from(document.querySelectorAll(".gallery__container--col"));

    if (elements.length === 0) return;

    const removeHideAll: (objects: HTMLCollection) => void = (objects: HTMLCollection) => {
      Array.from(objects).forEach((key: Element) => key.classList.remove("show"));
    };

    (() =>
      new Promise<HTMLCollection>(
        (resolve: (value: HTMLCollection | PromiseLike<HTMLCollection>) => void) => {
          resolve(elements[gallery].children);
        },
      )
        .then((children: HTMLCollection) => {
          removeHideAll(children);

          return children;
        })
        .then((children: HTMLCollection) => {
          const rand: number = Math.floor(Math.random() * (children.length - 1 - 0 + 1)) + 0;

          children[rand].classList.add("show");
        }))();
  });

  galleries.forEach((items: Gallery) => {
    const id: Gallery = items;

    id.images.forEach((img: Image) => {
      galleryArray.push(img);
    });
  });

  const addToRefsArr: (item: HTMLHeadingElement) => void = (item: HTMLHeadingElement) => {
    if (item) {
      wrapper.current.push(item);
    }
  };

  const addToRefs: (item: HTMLHeadingElement) => void = (item: HTMLHeadingElement) => {
    if (item) {
      subtitleWrapper.current.push(item);
    }
  };

  const sectionsToRefs: (section: HTMLHeadingElement) => void = (section: HTMLHeadingElement) => {
    if (section) sectionWrapper.current.push(section);
  };

  return (
    <>
      {desktop && <Cursor />}
      <Head>
        <title>Delfina&amp;Piotek</title>
        <meta name='description' content='Zapraszamy :)' />
        <meta name='robots' content='noindex' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Section className='video xxl:pt-0 xl:pt-0 pt-16 pb-24' id='video'>
          <div className='flex justify-center h-screen items-center'>
            <div className='md:w-8/12 w-full relative text-center'>
              <SectionVideo />
            </div>
          </div>
        </Section>
        <Section
          className='timeline beforeline md:overflow-visible overflow-hidden pb-12'
          id='timeline'
          ref={sectionsToRefs}>
          <div className='flex justify-center'>
            <div className='md:w-8/12 w-full'>
              <TimeLine />
            </div>
          </div>
        </Section>
        <Section className='map beforeline' ref={sectionsToRefs} id='map'>
          <div className='flex justify-center'>
            <div className='lg:w-8/12 w-full md:p-5 p-3 border-2 border-black opacity-0 transition-opacity duration-300 ease-linear delay-500 map__border'>
              <Map />
            </div>
          </div>
        </Section>
        <Section
          className='container max-w-fhd px-2 md:px-4 sm:pb-0 pb-12 gallery beforeline md:overflow-visible overflow-hidden'
          ref={sectionsToRefs}>
          <div className='flex justify-center'>
            <div className='lg:w-11/12 w-full'>
              <div className='lg:grid grid-cols-10 gap-x-4 '>
                <div className='lg:col-span-4 lg:pb-0 sm:pb-6 pb-10'>
                  <div className='sticky top-0'>
                    <Subtitle ref={addToRefs} className='mb-8'>
                      <span className='overflow-hidden'>
                        <span>Masz pytanie,</span>
                      </span>
                      <span className='overflow-hidden'>
                        <span>zadzwoń :</span>
                      </span>
                    </Subtitle>
                    <div ref={addToRefsArr}>
                      <p>
                        Delfina{" "}
                        <a
                          href='tel:+48508093384'
                          className='btn ml-4'
                          onMouseEnter={() => cursorChangeHandler("hovered")}
                          onMouseLeave={() => cursorChangeHandler("")}>
                          +48 508 093 384
                        </a>
                      </p>
                      <p>
                        Piotrek{" "}
                        <a
                          href='tel:+48509235952'
                          className='btn ml-4'
                          onMouseEnter={() => cursorChangeHandler("hovered")}
                          onMouseLeave={() => cursorChangeHandler("")}>
                          +48 509 235 952
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                {desktop && (
                  <div className='lg:col-span-6 grid grid-flow-row-dense lg:grid-cols-3 sm:grid-cols-2 grid-cols-none md:gap-5 gap-y-5 items-end gallery__container'>
                    {galleries.map((galleryItems: Gallery, index: number) => {
                      const id: Gallery = galleryItems;
                      const num: number = index;
                      return (
                        <div key={num} className={`gallery__container--col obj-${index}`}>
                          {id.images.map((img: Image, keyIndex: number) => {
                            const item: Image = img;
                            const i: number = keyIndex;
                            return (
                              <div
                                key={i}
                                className={`gallery__container--img ${i === 0 ? "show" : ""}`}>
                                <img src={item.url} alt={item.fileName} />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              {galleryArray.length > 0 && !desktop ? (
                <Swiper
                  modules={[Virtual, Navigation]}
                  spaceBetween={0}
                  autoHeight
                  slidesPerView={1}
                  navigation
                  autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                  virtual>
                  {galleryArray.map((img: Image, index: number) => {
                    const item: Image = img;
                    const i: number = index;
                    return (
                      <SwiperSlide key={item.id} virtualIndex={i}>
                        <SwiperItem>
                          <img src={item.url} alt={item.fileName} />
                        </SwiperItem>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <Swiper>
                  <SwiperSlide />
                </Swiper>
              )}
            </div>
          </div>
        </Section>
        <Section className='faq beforeline' ref={sectionsToRefs}>
          <div className='flex justify-center pt-10'>
            <div className='lg:w-11/12 w-full'>
              <div className='md:grid grid-cols-10 gap-x-4'>
                <div className='md:col-span-4 md:mb-0 mb-10'>
                  <Subtitle ref={addToRefs} className='sticky top-0'>
                    <span className='overflow-hidden'>
                      <span>Wszystko</span>
                    </span>
                    <span className='overflow-hidden'>
                      <span>co musisz</span>
                    </span>
                    <span className='overflow-hidden'>
                      <span>wiedzieć...</span>
                    </span>
                  </Subtitle>
                </div>
                <div className='md:col-span-6 grid lg:md:grid-cols-2 gap-x-10' ref={faqWrapper}>
                  {qas?.map((q: Question) => (
                    <div key={q.id} className='md:mb-20 mb-12'>
                      <h3 className='mb-8'>{q.question}</h3>

                      <RichText content={q.answer.raw.children} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <SectionFooter />
    </>
  );
}
