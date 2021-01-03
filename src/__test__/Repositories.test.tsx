import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Repositories from '../components/Repositories';
import { GET_REPOSITORIES } from '../queries/getRepositories';
import mockResponse from './mocks/response.json';

afterEach(cleanup);

const mocks = [
    {
        request: {
            query: GET_REPOSITORIES,
            variables: { first: 10, after: null },
        },
        result: { data: mockResponse },
    },
];

it('renders repo', async () => {
    const { findByText, getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Repositories />
        </MockedProvider>,
    );
    expect(getByText('Loading.....')).toBeInTheDocument();

    expect(await findByText('Test Case1')).toBeInTheDocument();

    mockResponse.search.nodes.forEach((post) => {
        expect(getByText(post.name)).toBeInTheDocument();
    });
});
