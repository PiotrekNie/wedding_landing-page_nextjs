import { GraphQLClient, gql } from "graphql-request";

import { RichText } from "@graphcms/rich-text-react-renderer";

import { RichTextContent } from "@graphcms/rich-text-types";

import Head from "next/head";

interface Question {
  id: string;
  question: string;
  answer: {
    raw: {
      children: RichTextContent;
    };
  };
}

interface Questions {
  qas: Question[];
}

export const getStaticProps = async () => {
  const endpoint = "https://api-eu-central-1.graphcms.com/v2/ckyhcar7j1w6j01xg1moc82pk/master";

  const graphQLClient = new GraphQLClient(endpoint);

  const query = gql`
    {
      qas {
        id
        question
        answer {
          raw
        }
      }
    }
  `;

  const data = await graphQLClient.request(query);

  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }: { data: Questions }) {
  return (
    <div>
      <Head>
        <title>Delfina&amp;Piotek</title>
        <meta name="description" content="Zapraszamy :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="container max-w-fhd px-2 md:px-4">
          <div className="flex justify-center">
            <div className="md:w-10/12 f-full">
              <div className="grid grid-cols-10 gap-x-4">
                <div className="md:col-span-4">
                  <h2>Wszystko co musisz wiedzieć...</h2>
                </div>
                <div className="md:col-span-6 grid md:grid-cols-2 gap-x-10">
                  {data?.qas?.map((q: Question) => (
                    <div key={q.id} className="md:mb-20 mb-12">
                      <h3 className="mb-8">{q.question}</h3>

                      <RichText content={q.answer.raw.children} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
