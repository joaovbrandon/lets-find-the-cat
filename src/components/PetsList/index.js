import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Creators as PetsActions } from '../../store/ducks/pets';
import { HelperService } from '../../services';
import Loader from '../Loader';
import Pagination from '../Pagination';
import PetItem from '../PetItem';
import { Container, Title, Fallback } from './styles';

function PetsList({
  userDonations, petsList, requesting, getPetsList, history, location,
}) {
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (totalPages > 1) {
      const params = queryString.parse(location.search);
      const page = params.page ? parseInt(params.page, 10) : 1;

      if (!Number.isInteger(page) || page < 1 || page > totalPages) {
        delete params.page;

        history.push({
          ...location,
          search: queryString.stringify(params),
        });
      } else {
        setCurrentPage(page);
      }
    }
  }, [location, history, totalPages]);

  useEffect(() => {
    setTotalPages(Math.ceil(petsList.length / pageSize));
  }, [petsList, setTotalPages]);

  useEffect(() => {
    getPetsList();
  }, [getPetsList]);

  const renderPetsList = () => {
    if (!petsList.length) return <Fallback>We haven&apos;t registered lost pets yet!</Fallback>;

    return HelperService.paginate(petsList, pageSize, currentPage).map((pet) => {
      const donation = userDonations.filter(tempDonation => tempDonation.petId === pet.id)[0];
      const amountDonated = donation ? donation.amountDonated : null;
      return <PetItem key={pet.id} pet={pet} amountDonated={amountDonated} />;
    });
  };

  return (
    <Container>
      <Title>Lost and Found Pets</Title>
      {requesting ? <Loader loaderStyle="spin" /> : renderPetsList()}
      <Pagination totalPages={totalPages} currentPage={currentPage} />
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  userDonations: state.donations.userDonations,
  petsList: state.pets.petsList,
  requesting: state.pets.requesting,
});

const mapDispatchToProps = dispatch => bindActionCreators(PetsActions, dispatch);

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PetsList);
