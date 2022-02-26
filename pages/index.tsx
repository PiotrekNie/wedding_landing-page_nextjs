import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";
import { gql, GraphQLClient } from "graphql-request";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
// Partials
import Head from "next/head";
import GallerySection from "./components/gallery";
import Map from "./components/googleMaps";
import TimeLine from "./components/timeLine";
import SectionVideo from "./components/videoPlayer";

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

const Section: StyledComponent<"section", Record<string, unknown>, {}, never> = styled.section`
  ${tw`
    container max-w-fhd px-2 md:px-4
  `}
`;

export const getStaticProps: () => void = async () => {
  const endpoint: string =
    "https://api-eu-central-1.graphcms.com/v2/ckyhcar7j1w6j01xg1moc82pk/master";

  const graphQLClient: GraphQLClient = new GraphQLClient(endpoint);

  const query: string = gql`
    {
      qas {
        id
        question
        answer {
          raw
        }
      }
      galleries {
        id
        images {
          id
          url
          fileName
        }
      }
    }
  `;

  const data: GraphQLClient = await graphQLClient.request(query);

  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }: { data: Sections }) {
  return (
    <div>
      <Head>
        <title>Delfina&amp;Piotek</title>
        <meta name='description' content='Zapraszamy :)' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Section className='video show pt-36 pb-40' id='video'>
          <div className='flex justify-center'>
            <div className='md:w-8/12 f-full relative'>
              <SectionVideo />
            </div>
          </div>
        </Section>
        <Section className='timeline show beforeline' id='timeline'>
          <div className='flex justify-center'>
            <div className='md:w-8/12 f-full'>
              <TimeLine />
            </div>
          </div>
        </Section>
        <Section className='map show beforeline' id='map'>
          <div className='flex justify-center'>
            <div className='md:w-8/12 f-full p-5 border-2 border-black'>
              <Map />
            </div>
          </div>
        </Section>
        <GallerySection galleries={data.galleries} />
        <Section className='faq show beforeline'>
          <div className='flex justify-center'>
            <div className='md:w-11/12 f-full'>
              <div className='grid grid-cols-10 gap-x-4'>
                <div className='md:col-span-4'>
                  <h2 className='sticky top-0'>
                    Wszystko <br />
                    co musisz <br />
                    wiedzieć...
                  </h2>
                </div>
                <div className='md:col-span-6 grid md:grid-cols-2 gap-x-10'>
                  {data?.qas?.map((q: Question) => (
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
    </div>
  );
}
