import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query getRepositories($first: Int!, $after: String) {
        search(type: REPOSITORY, query: "language:Javascript", first: $first, after: $after) {
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
