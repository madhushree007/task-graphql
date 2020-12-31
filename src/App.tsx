import { ApolloProvider } from '@apollo/client';
import React from 'react';
import client from './apolloClient';
import './App.css';
import Repositories from './components/Repositories';

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <div className='container'>
        <h1>Github Repositories</h1>
        <Repositories />
      </div>
    </ApolloProvider>
  );
}

export default App;
