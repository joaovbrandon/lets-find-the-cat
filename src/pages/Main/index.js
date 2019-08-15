import React from 'react';
import { Header, Footer, PetsList } from '../../components';
import { Container } from './styles';

const Main = () => (
  <>
    <Header />
    <Container>
      <PetsList />
    </Container>
    <Footer />
  </>
);

export default Main;
