import { useLazyQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState } from 'react';
import { Iprops } from '../../Iprops';
import { GET_REPOSITORIES } from '../../queries/getRepositories';


export default function SearchBar() {
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    getRepo()
  }

  const [getRepo, { loading, error, data}] = useLazyQuery(GET_REPOSITORIES, {
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

  

  return (
    <div>
    <form role="search" className="SearchBar" onSubmit={handleSubmit}>
      <label htmlFor="search-bar">Search Repo</label>
      <input
        id="search-bar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type='submit'>Search</button>
    </form>
    {data && 
      <table className='table'>
      <thead className="thead-dark">
      <tr>
        <th>Name</th>
        <th><i className="fa fa-star"></i> Stars</th>
        <th><i className="fa fa-code-fork"></i> Forks</th>
      </tr>
      </thead>
      <tbody>
      {data.search.nodes.map((item:Iprops, i:number) => (
        <tr>
          <td><a href={item.url} target='_blank' rel="noreferrer">{item.name}</a></td>
          <td><i className="fa fa-star"></i> {item.stargazers.totalCount}</td>
          <td><i className="fa fa-code-fork"></i> {item.forks.totalCount}</td>
        </tr>
      ))}
      </tbody>
    </table>
    }
    </div>
  )
}
