import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query getRepositories($query: string, $after: String) {
    search(
      type: REPOSITORY
      query: $query
      first: 10
      after: $after
    ) {
      nodes {
        ... on Repository {
          id
          name
          url
          descriptionHTML
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
`;
