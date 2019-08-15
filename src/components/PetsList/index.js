import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PetsActions } from '../../store/ducks/pets';
import Loader from '../Loader';
import PetItem from '../PetItem';
import { Container, Fallback } from './styles';

function PetsList({ petsList, requesting, getPetsList }) {
  useEffect(() => {
    getPetsList();
  }, [getPetsList]);

  const renderPetsList = () => {
    if (!petsList.length) return <Fallback>We haven&apos;t registered lost pets yet!</Fallback>;
    return petsList.map(pet => <PetItem key={pet.id} pet={pet} />);
  };

  return (
    <Container>
      {requesting ? <Loader loaderStyle="spin" /> : renderPetsList()}
    </Container>
  );
}

PetsList.propTypes = {
  petsList: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  requesting: PropTypes.bool.isRequired,
  getPetsList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  petsList: state.pets.petsList,
  requesting: state.pets.requesting,
});

const mapDispatchToProps = dispatch => bindActionCreators(PetsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PetsList);
