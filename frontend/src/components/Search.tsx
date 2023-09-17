import React, { useState } from 'react';
import { Container, Input, Button, Row, Col } from 'reactstrap';
import MovieCard from './MovieCard';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    fetch(`http://localhost:8000/api/v1/movies/search?query=${query}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        return response.json();
      })
      .then(data => {
        setSearchResults(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <Container>
      <Header />
      <h1 className="display-5">Search Movies</h1>
      <Row noGutters className="my-3">
        <Col xs={12} md={8}>
          <Input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button color="primary" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Col>
      </Row>
      <Row>
        {searchResults.map(movie => (
          <Col sm="6" md="4" lg="2" key={movie.id}>
            <MovieCard movie={movie} isWatchlist={false} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchPage;
