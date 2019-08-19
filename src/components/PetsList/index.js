import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { Creators as PetsActions } from '../../store/ducks/pets';
import { HelperService } from '../../services';
import Loader from '../Loader';
import Pagination from '../Pagination';
import PetItem from '../PetItem';
import Select from '../Select';
import {
  Container, Title, Filters, ExcludeFoundPetsFilter, Fallback,
} from './styles';

function PetsList({
  userDonations, petsList, requesting, getPetsList, history, location,
}) {
  const pageSize = 6;
  const [loading, setLoading] = useState(true);
  const [petsListFiltered, setPetsListFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [excludeFoundPets, setExcludeFoundPets] = useState(false);

  const [regions, setRegions] = useState([]);
  const [regionsOptions, setRegionsOptions] = useState([]);
  const [defaultRegionsOptions, setDefaultRegionsOptions] = useState([]);

  const [orderBy, setOrderBy] = useState('lostDateDesc');
  const [defaultOrderByOption, setDefaultOrderByOption] = useState({
    value: 'lostDateDesc', label: 'Lost Date Descending',
  });
  const [orderByOptions] = useState([
    { value: 'lostDateDesc', label: 'Lost Date Descending' },
    { value: 'lostDateAsc', label: 'Lost Date Ascending' },
    { value: 'petName', label: 'Pet Name' },
  ]);

  useEffect(() => {
    getPetsList();
  }, [getPetsList]);

  useEffect(() => {
    const params = queryString.parse(location.search, { parseBooleans: true });
    const newOrderBy = params.orderBy ? params.orderBy : 'lostDateDesc';
    setExcludeFoundPets(!params.excludeFoundPets);
    setRegions(params.regions ? params.regions : []);
    setOrderBy(newOrderBy);
    setDefaultOrderByOption([...orderByOptions].find(orderByOption => (
      orderByOption.value === newOrderBy
    )));
  }, [
    location,
    orderByOptions,
    setExcludeFoundPets,
    setRegions,
    setOrderBy,
    setDefaultOrderByOption,
  ]);

  useEffect(() => {
    if (totalPages > 0 && !loading) {
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
  }, [location, history, loading, totalPages, setCurrentPage]);

  useEffect(() => {
    if (!petsList.length) return;

    setLoading(true);

    let newPetsListFiltered = [...petsList];

    // Exclude found pets
    if (!excludeFoundPets) newPetsListFiltered = newPetsListFiltered.filter(pet => !pet.found);

    // Filter by region
    if (regions.length) {
      newPetsListFiltered = newPetsListFiltered.filter(pet => (
        regions.includes(pet.locality)));
    }

    // Order by name
    newPetsListFiltered.sort((a, b) => {
      switch (orderBy) {
        // Pet Name
        case 'petName':
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;

        // Lost Date Ascending
        case 'lostDateAsc':
          return new Date(a.lostDate) - new Date(b.lostDate);

        // Lost Date Descending
        default:
          return new Date(b.lostDate) - new Date(a.lostDate);
      }
    });

    const newTotalPages = Math.ceil(newPetsListFiltered.length / pageSize);
    if (totalPages !== newTotalPages) setTotalPages(newTotalPages > 0 ? newTotalPages : 1);

    setPetsListFiltered([...newPetsListFiltered]);
    setLoading(false);
  }, [petsList, excludeFoundPets, regions, orderBy, totalPages, setTotalPages, setLoading]);

  useEffect(() => {
    let newRegionsOptions = Array.from(new Set(petsList.map(({ locality }) => locality)));

    newRegionsOptions = newRegionsOptions.map((label, value) => ({ label, value }));

    setRegionsOptions([...newRegionsOptions]);
  }, [petsList, setRegionsOptions]);

  useEffect(() => {
    const newDefaultRegionsOptions = regionsOptions.filter(regionOption => (
      regions.includes(regionOption.label)));

    setDefaultRegionsOptions([...newDefaultRegionsOptions]);
  }, [regions, regionsOptions, setDefaultRegionsOptions]);

  const handleFilterByRegions = (selectedRegions) => {
    const params = queryString.parse(location.search);
    delete params.page;

    if (!selectedRegions || !selectedRegions.length) delete params.regions;
    else params.regions = selectedRegions.map(({ label }) => label).join(',');

    history.push({
      ...location,
      search: queryString.stringify(params),
    });
  };

  const handleOrderBy = (selectedOrderBy) => {
    if (selectedOrderBy.value === orderBy) return;

    const params = queryString.parse(location.search);
    delete params.page;

    params.orderBy = selectedOrderBy.value;

    history.push({
      ...location,
      search: queryString.stringify(params),
    });
  };

  const handleExcludeFoundPets = () => {
    const params = queryString.parse(location.search);
    delete params.page;
    delete params.excludeFoundPets;

    if (excludeFoundPets) params.excludeFoundPets = true;

    history.push({
      ...location,
      search: queryString.stringify(params),
    });
  };

  const renderPetsList = () => {
    if (!petsListFiltered.length) {
      return <Fallback>We haven&apos;t registered pets that match the filters!</Fallback>;
    }

    return HelperService.paginate(petsListFiltered, pageSize, currentPage).map((pet) => {
      const donation = userDonations.filter(tempDonation => tempDonation.petId === pet.id)[0];
      const amountDonated = donation ? donation.amountDonated : null;
      return <PetItem key={pet.id} pet={pet} amountDonated={amountDonated} />;
    });
  };

  return (
    <Container>
      <Title>Lost and Found Pets</Title>

      {(!requesting && !loading && currentPage > 0)
        ? (
          <>
            <Filters>
              <Select
                label="Filter by regions"
                name="regions"
                options={regionsOptions}
                value={defaultRegionsOptions}
                multiple
                placeholder="Select the regions"
                onChange={handleFilterByRegions}
              />

              <Select
                label="Order By"
                name="orderBy"
                options={orderByOptions}
                value={defaultOrderByOption}
                onChange={handleOrderBy}
                clearable={false}
                searchable={false}
              />

              <ExcludeFoundPetsFilter onClick={handleExcludeFoundPets}>
                {'Exclude found pets '}
                <FontAwesomeIcon icon={excludeFoundPets ? faSquare : faCheckSquare} size="lg" />
              </ExcludeFoundPetsFilter>
            </Filters>
            {renderPetsList()}
          </>
        )
        : <Loader loaderStyle="spin" />
      }

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
