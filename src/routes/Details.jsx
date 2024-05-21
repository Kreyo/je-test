import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_OMDB_KEY;

function Details() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details from OMDB API', error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="MovieDetail">
      <Link to={"/"}>Back to search results</Link>
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={`${movie.Title} Poster`} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Rated:</strong> {movie.Rated}</p>
      <p><strong>Released:</strong> {movie.Released}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Writer:</strong> {movie.Writer}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Language:</strong> {movie.Language}</p>
      <p><strong>Country:</strong> {movie.Country}</p>
      <p><strong>Awards:</strong> {movie.Awards}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
    </div>
  );
}

export default Details;
