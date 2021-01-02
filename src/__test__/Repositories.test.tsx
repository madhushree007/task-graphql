import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, waitFor } from '@testing-library/react';
import React from 'react';
import Repositories from '../components/Repositories';
import { GET_REPOSITORIES } from '../queries/getRepositories';
import singleResponse from './mocks/response.json';

afterEach(cleanup);

const mocks = [
    {
        request: {
            query: GET_REPOSITORIES,
            variables: { first: 2, after: null },
        },
        result: { data: singleResponse },
    },
];

it('renders repo', async () => {
    const { findByText, getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Repositories />
        </MockedProvider>,
    );
    expect(getByText('Loading.....')).toBeInTheDocument();
    await waitFor(() => getByText('Test Case1'));
    const repoTag = await findByText('Test Case1');
    expect(repoTag).toBeInTheDocument();
});
