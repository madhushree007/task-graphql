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

export const GET_REPOSITORIES_FILTER = gql`
    query getRepositories($queryString: String!) {
        search(query: $queryString, type: REPOSITORY, first: 10) {
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
