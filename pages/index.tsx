import React from "react";
import dynamic from "next/dynamic";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";
import { GraphQLClient } from "graphql-request";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
// Partials
import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import GetGallery from "../lib/data";
import Map from "./components/googleMaps";
import TimeLine from "./components/timeLine";
import SectionVideo from "./components/videoPlayer";
import SectionFooter from "./components/footer";
import SCREENS from "../components/screens/index";

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

// Dynamic imports
const GalleryDesktop: React.ComponentType<{ data: Sections }> = dynamic(
  () => import("./components/galleryDesktop"),
  { ssr: false },
);
const GalleryMobile: React.ComponentType<{ data: Sections }> = dynamic(
  () => import("./components/galleryMobile"),
  {
    ssr: false,
  },
);

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
  const { qas }: Sections = data;
  const isDesktop: boolean = useMediaQuery({ minWidth: SCREENS.md });

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
                      zadzwoń :&#41;
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
                {isDesktop && <GalleryDesktop data={data} />}
              </div>
              {!isDesktop && <GalleryMobile data={data} />}
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
