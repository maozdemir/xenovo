import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import MovieCard from './MovieCard';
import { Col, Container, Row } from 'reactstrap';
import Header from './Header';

const Popular: React.FC = () => {
    const [popularMovies, setPopularMovies] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/api/v1/movies/popular?page=${currentPage}`);
                const results = response.json();
                setPopularMovies(await results);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        fetchPopularMovies();
    }, [currentPage]);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
        window.scrollTo(0, 0);
    };

    return (
        <Container>
            <Header />
            <div>
                <h1 className="display-5">Popular Movies</h1>
                <div className="text-center popularContainer">
                    <Row>{isLoading ? (
                        <div className="loading-spinner">
                            <div className="spinner-border m-auto" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>) : (
                        popularMovies.map((movie) => (
                                <Col sm="6" md="4" lg="2" key={movie.id}>
                                    <MovieCard key={movie.id} movie={movie} isWatchlist={false} />
                                </Col>
                            ))
                        )}
                    </Row>
                </div>
                <ReactPaginate
                    pageCount={100}
                    onPageChange={handlePageChange}
                    containerClassName="pagination justify-content-center"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    activeClassName="active"
                    previousLabel="Previous"
                    nextLabel="Next"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                />
            </div>
        </Container>
    );
};

export default Popular;
