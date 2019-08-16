import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PetsActions } from '../../store/ducks/pets';
import Loader from '../Loader';
import PetItem from '../PetItem';
import { Container, Title, Fallback } from './styles';

function PetsList({
  userDonations, petsList, requesting, getPetsList,
}) {
  useEffect(() => {
    getPetsList();
  }, [getPetsList]);

  const renderPetsList = () => {
    if (!petsList.length) return <Fallback>We haven&apos;t registered lost pets yet!</Fallback>;

    return petsList.map((pet) => {
      const donation = userDonations.filter(tempDonation => tempDonation.petId === pet.id)[0];
      const amountDonated = donation ? donation.amountDonated : null;
      return <PetItem key={pet.id} pet={pet} amountDonated={amountDonated} />;
    });
  };

  return (
    <Container>
      <Title>Lost and Found Pets</Title>
      {requesting ? <Loader loaderStyle="spin" /> : renderPetsList()}
    </Container>
  );
}

PetsList.propTypes = {
  userDonations: PropTypes.arrayOf(
    PropTypes.shape({
      amountDonated: PropTypes.string.isRequired,
      petId: PropTypes.string.isRequired,
    }),
  ).isRequired,
  petsList: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  requesting: PropTypes.bool.isRequired,
  getPetsList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userDonations: state.donations.userDonations,
  petsList: state.pets.petsList,
  requesting: state.pets.requesting,
});

const mapDispatchToProps = dispatch => bindActionCreators(PetsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PetsList);
