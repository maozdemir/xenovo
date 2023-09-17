// src/components/MovieCard.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import Auth from '../Auth';

const MovieCard: React.FC<{ movie: any, isWatchlist: boolean }> = ({ movie, isWatchlist }) => {
  const isLoggedIn = Auth();
  const [details, setDetails] = useState<any>(movie);
  const [isLoading, setIsLoading] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(movie.watchlisted);
  const addToWatchlist = () => {
    const request = fetch('http://localhost:8000/api/v1/watchlist', {
      method: 'POST',
      body: JSON.stringify({ movie_id: movie.id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (isWatchlisted) {
      request.then(() => setIsWatchlisted(false));
    } else {
      request.then(() => setIsWatchlisted(true));
    }

  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8000/api/v1/movies/${movie.movie_id}`);
      const data = await response.json();
      setDetails(data);
      setIsLoading(false);
    };

    if (isWatchlist) fetchMovieDetails();
  }, [movie, isWatchlist]);

  return (
    <Card>{isLoading ? (
      <div className="loading-spinner">
        <div className="spinner-border m-auto" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>) : (
      <><CardImg top width="100%" src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title} /><CardBody>
        <CardTitle tag="h5">{details.title}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{details.release_date}</CardSubtitle>
        <Button>Details</Button>
        {isLoggedIn && <Button onClick={addToWatchlist}>
          <FontAwesomeIcon icon={(isWatchlisted || isWatchlist) ? fasStar : farStar} />
        </Button>}
      </CardBody></>)}
    </Card>
  );
};

export default MovieCard;
