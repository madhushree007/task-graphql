import { useQuery } from '@apollo/client';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { Iprops } from '../Iprops';
import { GET_REPOSITORIES } from '../queries/getRepositories';
import './Repositories.css';

export default function Repositories (): JSX.Element {
  const { loading, error, data, fetchMore} = useQuery(GET_REPOSITORIES, {
    variables: { after: null}
  });

if (loading) {
    return (
      <div>
        <p>Loading.....</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p>Something went wrong!</p>
      </div>
    )
  }

  if (data) { 
  return (
    <div className='repos'>
      
      <ul className='reposUL'>
        <li className='top'>
          <div>Name</div>
          <div><i className="fa fa-star"></i>Stars</div>
          <div><i className="fa fa-code-fork"></i>Forks</div>
        </li>
        {data.search.nodes.map((item:Iprops, i:number) => (
          <li>
            <div>{item.name}</div>
            <div><i className="fa fa-star"></i> {item.stargazers.totalCount} </div>
            <div><i className="fa fa-code-fork"></i> {item.forks.totalCount} </div>
          </li>
          )
        )}
      </ul>
      
      <button onClick={() => {
        const { endCursor } = data.search.pageInfo;
        fetchMore({
           variables: { after: endCursor},
           updateQuery: (prevResult, { fetchMoreResult }) => {
            fetchMoreResult.search.nodes = [
              ...prevResult.search.nodes,
              ...fetchMoreResult.search.nodes
            ]
            return fetchMoreResult;
           }
        })
      }}>
        MORE
      </button>
    </div>
  )}
}