import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PetsActions } from '../../store/ducks/pets';
import PetItem from '../PetItem';
import {
  Container, Info, Value, Fallback,
} from './styles';

function MyDonations({
  userDonations, totalAmountDonated, petsList, canGetPetsList, getPetsList,
}) {
  useEffect(() => {
    if (canGetPetsList && !petsList.length) getPetsList();
  }, [canGetPetsList, petsList, getPetsList]);

  const renderPetsList = () => {
    if (!petsList.length || !userDonations.length) {
      return <Fallback>You haven&apos;t donated yet!</Fallback>;
    }

    return userDonations.slice(0).reverse().map((donation) => {
      const pet = petsList.filter(tempPet => tempPet.id === donation.petId)[0];
      return <PetItem key={pet.id} itemStyle="list" pet={pet} amountDonated={donation.amountDonated} />;
    });
  };

  return (
    <Container>
      <Info>
        Total Amount Donated:
        <Value>{` ${totalAmountDonated} `}</Value>
      </Info>
      {renderPetsList()}
    </Container>
  );
}

MyDonations.defaultProps = {
  canGetPetsList: true,
};

MyDonations.propTypes = {
  canGetPetsList: PropTypes.bool,
  userDonations: PropTypes.arrayOf(
    PropTypes.shape({
      amountDonated: PropTypes.string.isRequired,
      petId: PropTypes.string.isRequired,
    }),
  ).isRequired,
  totalAmountDonated: PropTypes.string.isRequired,
  petsList: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  getPetsList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userDonations: state.donations.userDonations,
  totalAmountDonated: state.donations.totalAmountDonated,
  petsList: state.pets.petsList,
});

const mapDispatchToProps = dispatch => bindActionCreators(PetsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyDonations);
