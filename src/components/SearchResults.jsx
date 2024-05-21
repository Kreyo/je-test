import React from 'react';
import { Link } from 'react-router-dom';

function SearchResults({ results }) {
  return (
    <>
    {results.length ? <h2>Search Results</h2> : ''}
      <ul>
        {results.map((movie) => (
          <li key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              {movie.Title} ({movie.Year})
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchResults;
