import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function PetItem({ itemStyle, pet, amountDonated }) {
  const [totalAmountDonated, setTotalAmountDonated] = useState(0);

  useEffect(() => {
    if (canGetPetsList && !petsList.length) getPetsList();
  }, [canGetPetsList, petsList, getPetsList]);

  useEffect(() => {
    setTotalAmountDonated(
      userDonations.reduce((accumulator, donation) => accumulator + donation.amountDonated, 0),
    );
  }, [userDonations, setTotalAmountDonated]);

  const renderPetsList = () => {
    if (!userDonations.length) return <Fallback>You haven&apos;t donated yet!</Fallback>;

    return userDonations.map((donation) => {
      const pet = petsList.filter(tempPet => tempPet.id === donation.petId)[0];
      return <PetItem type="list" pet={pet} amountDonated={donation.amountDonated} />;
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

PetItem.defaultProps = {
  itemStyle: 'card',
  amountDonated: null,
};

PetItem.propTypes = {
  itemStyle: PropTypes.string,
  pet: PropTypes.arrayOf(
    PropTypes.shape({
      amountDonated: PropTypes.number.isRequired,
      petId: PropTypes.string.isRequired,
    }),
  ).isRequired,
  amountDonated: PropTypes.number,
};

export default PetItem;
