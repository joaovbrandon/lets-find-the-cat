import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Cat404 } from '../../assets/cat-404.svg';
import { Header, Footer } from '../../components';
import { Container } from './styles';

const NotFound = () => (
  <>
    <Header />
    <Container>
      <h2>Oops!</h2>
      <h3>This page doesn&apos;t exist...</h3>
      <Cat404 />
      <Link to="/lets-find-the-cat">Click here to go home.</Link>
    </Container>
    <Footer />
  </>
);

export default NotFound;
