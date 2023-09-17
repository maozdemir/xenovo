// src/components/Home.tsx
import React from 'react';
import Header from './Header';
import MovieList from './PopularComponent';
import Watchlist from './WatchlistComponent';
import Auth from '../Auth';
import { Container } from 'reactstrap';

const Home: React.FC = () => {
  const isLoggedIn = Auth();
  return (
    <>
      <Header />
      <Container>
        <MovieList />
        {isLoggedIn && <Watchlist />}
      </Container>
    </>
  );
}

export default Home;
