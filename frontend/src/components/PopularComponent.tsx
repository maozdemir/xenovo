// src/components/MovieList.tsx
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import MovieCard from './MovieCard';

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await
          fetch('http://localhost:8000/api/v1/movies/popular',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
        const data = await response.json();
        setIsLoading(false);
        setMovies(data.slice(0, 6));
      } catch (error: unknown) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchMovies();
    console.log('movies', movies);
  }, [movies]);


  return (
    <div>
      <h1 className="display-5">Popular Movies</h1>
      <div className="text-center popularContainer">
        <Row>{isLoading ? (
          <div className="loading-spinner">
            <div className="spinner-border m-auto" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>) : (
          movies && movies.map(movie => (
            <Col sm="6" md="4" lg="2" key={movie.id}>
              <MovieCard movie={movie} isWatchlist={false} />
            </Col>
          )))}
        </Row>
      </div></div>
  );
};

export default MovieList;
