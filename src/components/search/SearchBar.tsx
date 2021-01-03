import { useLazyQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState } from 'react';
import { Iprops } from '../../Iprops';
import { GET_REPOSITORIES_FILTER } from '../../queries/getRepositories';
export default function SearchBar(): JSX.Element {
    const [query, setQuery] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        getRepo();
    };

    const [getRepo, { loading, error, data }] = useLazyQuery(GET_REPOSITORIES_FILTER, {
        variables: { query: 'language: Javascript' },
    });

    return (
        <div>
            <form role="search" className="form-inline pull-right" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="search-bar">Search Repo&nbsp;&nbsp;</label>
                    <input
                        id="search-bar"
                        className="form-control"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-3">
                    Search
                </button>
            </form>

            {loading && (
                <div>
                    <p>Loading....</p>
                </div>
            )}

            {error && (
                <div>
                    <p className="error">Something went wrong while fetching the data</p>
                </div>
            )}

            {data && (
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>
                                <i className="fa fa-star"></i> Stars
                            </th>
                            <th>
                                <i className="fa fa-code-fork"></i> Forks
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.search.nodes.map((item: Iprops, i: number) => (
                            <tr key={i}>
                                <td>
                                    <a href={item.url} target="_blank" rel="noreferrer">
                                        {item.name}
                                    </a>
                                </td>
                                <td>
                                    <i className="fa fa-star"></i> {item.stargazers.totalCount}
                                </td>
                                <td>
                                    <i className="fa fa-code-fork"></i> {item.forks.totalCount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
