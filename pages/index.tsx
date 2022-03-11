import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";
import { GraphQLClient } from "graphql-request";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
// Partials
import Head from "next/head";
import GetGallery from "../lib/data";
import Map from "./components/googleMaps";
import TimeLine from "./components/timeLine";
import SectionVideo from "./components/videoPlayer";
import SectionFooter from "./components/footer";

interface Question {
  id: string;
  question: string;
  answer: {
    raw: {
      children: RichTextContent;
    };
  };
}

interface Gallery {
  id: string;
  images: {
    id: string;
    url: string;
    fileName: string;
  }[];
}

interface Sections {
  qas: Question[];
  galleries: Gallery[];
}

interface Image {
  id: string;
  url: string;
  fileName: string;
}

const Section: StyledComponent<"section", Record<string, unknown>, {}, never> = styled.section`
  ${tw`
    container max-w-fhd px-2 md:px-4
  `}
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
  const [gallery, setGallery]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);

  const { qas, galleries }: Sections = data;

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

  return (
    <>
      <Head>
        <title>Delfina&amp;Piotek</title>
        <meta name='description' content='Zapraszamy :)' />
        <meta name='robots' content='noindex' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Section className='video show lg:pt-20 pt-16 pb-24' id='video'>
          <div className='flex justify-center'>
            <div className='md:w-8/12 w-full relative text-center'>
              <SectionVideo />
            </div>
          </div>
        </Section>
        <Section className='timeline show beforeline overflow-hidden pb-12' id='timeline'>
          <div className='flex justify-center'>
            <div className='md:w-8/12 w-full'>
              <TimeLine />
            </div>
          </div>
        </Section>
        <Section className='map show beforeline' id='map'>
          <div className='flex justify-center'>
            <div className='lg:w-8/12 w-full md:p-5 p-3 border-2 border-black'>
              <Map />
            </div>
          </div>
        </Section>
        <Section className='container max-w-fhd px-2 md:px-4 sm:pb-0 pb-12 gallery show beforeline md:overflow-visible overflow-hidden'>
          <div className='flex justify-center'>
            <div className='lg:w-11/12 w-full'>
              <div className='lg:grid grid-cols-10 gap-x-4 '>
                <div className='lg:col-span-4 lg:pb-0 sm:pb-6 pb-10'>
                  <div className='sticky top-0'>
                    <h2 className='mb-8'>
                      Masz pytanie, <br />
                      zadzwoń :)
                    </h2>
                    <div>
                      <p>
                        Delfina{" "}
                        <a href='tel:+48508093384' className='btn ml-4'>
                          +48 508 093 384
                        </a>
                      </p>
                      <p>
                        Piotrek{" "}
                        <a href='tel:+48509235952' className='btn ml-4'>
                          +48 509 235 952
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
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
              </div>
            </div>
          </div>
        </Section>
        <Section className='faq show beforeline'>
          <div className='flex justify-center'>
            <div className='lg:w-11/12 w-full'>
              <div className='md:grid grid-cols-10 gap-x-4'>
                <div className='md:col-span-4 md:mb-0 mb-10'>
                  <h2 className='sticky top-0'>
                    Wszystko <br />
                    co musisz <br />
                    wiedzieć...
                  </h2>
                </div>
                <div className='md:col-span-6 grid lg:md:grid-cols-2 gap-x-10'>
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
