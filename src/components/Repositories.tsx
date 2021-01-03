import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { Iprops } from '../Iprops';
import { GET_REPOSITORIES } from '../queries/getRepositories';
import './Repositories.css';

export default function Repositories(): JSX.Element {
    const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES, {
        variables: { first: 10, after: null },
    });

    // gets next 10 data from endcursor
    const handleMore = (endCursor) => {
        fetchMore({
            variables: { after: endCursor },
            updateQuery: (prevResult, { fetchMoreResult }) => {
                fetchMoreResult.search.nodes = [...prevResult.search.nodes, ...fetchMoreResult.search.nodes];
                return fetchMoreResult;
            },
        });
    };

    // if query is in loading state, show the "Loading..." text
    if (loading) {
        return (
            <div>
                <p>Loading.....</p>
            </div>
        );
    }

    // if query returns error, it throws error on the page
    if (error) {
        return (
            <div>
                <p>Something went wrong!</p>
            </div>
        );
    }

    // if query return data then it renders on the screen
    if (data) {
        return (
            <div>
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

                {/* Load more button */}
                <div className="moreBtn">
                    <button onClick={() => handleMore(data.search.pageInfo.endCursor)} className="btn btn-primary">
                        LOAD MORE
                    </button>
                </div>
            </div>
        );
    }
}
