import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';
import { Container, Cat404 } from './styles';

const NotFound = () => (
  <>
    <Header />
    <Container>
      <h2>Oops!</h2>
      <h3>This page doesn&apos;t exist...</h3>
      <Cat404 />
      <Link to="/">Click here to go home.</Link>
    </Container>
    <Footer />
  </>
);

export default NotFound;
