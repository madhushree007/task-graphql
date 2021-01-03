import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_BASE_URL });

const authLink = setContext((_, { headers }) => {
    const token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;

    return {
        headers: {
            Authorization: `bearer ${token}`,
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
