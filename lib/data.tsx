import { gql, GraphQLClient } from "graphql-request";

export const GetGallery: () => Promise<GraphQLClient> = async () => {
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
      weddingGalleries(first: 1000) {
        id
      }
    }
  `;

  return graphQLClient.request(query);
};

export const GetGalleryItems: (skip: number) => Promise<GraphQLClient> = async (skip: number) => {
  const endpoint: string =
    "https://api-eu-central-1.graphcms.com/v2/ckyhcar7j1w6j01xg1moc82pk/master";

  const graphQLClient: GraphQLClient = new GraphQLClient(endpoint);

  const query: string = gql`
    query GetGallery($skip: Int!) {
      weddingGalleries(first: 9, skip: $skip) {
        photos {
          id
          url
          fileName
          height
          width
        }
      }
    }
  `;

  const variables: {
    skip: number;
  } = {
    skip,
  };

  return graphQLClient.request(query, variables);
};

export default GetGallery;
