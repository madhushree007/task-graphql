import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@testing-library/react';
import { GET_REPOSITORIES } from '../queries/getRepositories';
import Repositories from './Repositories';

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: GET_REPOSITORIES,
    }
  }
]

it('renders repo', async () => {
  const { findByText, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Repositories />
    </MockedProvider>
  );

  expect(getByText('Loading.....')).toBeInTheDocument();

  // const repoTag = await findByText('freeCodeCamp');

  // expect(repoTag).toBeInTheDocument();
});