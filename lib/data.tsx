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
    }
  `;

  return graphQLClient.request(query);
};

export default GetGallery;
