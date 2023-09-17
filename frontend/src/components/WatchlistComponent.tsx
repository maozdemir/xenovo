import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Row, Col } from 'reactstrap';
import Header from './Header';

const Watchlist: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/watchlist',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        )
            .then((response) => {
                setIsLoading(false);
                if (!response.ok) {
                    throw new Error('Failed to fetch watchlist movies');
                }
                return response.json();
            })
            .then((data) => {
                setMovies(data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }, []);

    return (
        <div>
            <h1 className="display-5">Watch List</h1>
            <div className="text-center popularContainer">
                <Row>{isLoading ? (
                    <div className="loading-spinner">
                        <div className="spinner-border m-auto" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>) : (
                    movies && movies.map(movie => (
                        <Col sm="6" md="4" lg="2" key={movie.id}>
                            <MovieCard movie={movie} isWatchlist={true} />
                        </Col>
                    )))}
                </Row>
            </div></div>
    );
};

export default Watchlist;
