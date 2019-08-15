import { createActions, createReducer } from 'reduxsauce';
import { HelperService } from '../../services';

export const { Types, Creators } = createActions(
  {
    getPetsList: null,
    updatePetsList: ['petsList'],
    updatePetAmountCollected: ['petId', 'amountDonated'],
  },
  { prefix: 'pets/' },
);

const INITIAL_STATE = {
  petsList: [],
  requesting: true,
};

export const getPetsList = (state = INITIAL_STATE) => state;

export const updatePetsList = (state = INITIAL_STATE, { petsList }) => ({
  ...state,
  petsList,
  requesting: false,
});

export const updatePetAmountCollected = (state = INITIAL_STATE, { petId, amountDonated }) => {
  const petsList = state.petsList.map((pet) => {
    if (pet.id === petId) {
      const newAmountCollected = pet.amountCollectedUnformatted + amountDonated;

      return {
        ...pet,
        amountCollectedUnformatted: newAmountCollected,
        amountCollected: HelperService.currencyFormat(newAmountCollected),
      };
    }

    return pet;
  });

  return {
    ...state,
    petsList,
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.GET_PETS_LIST]: getPetsList,
  [Types.UPDATE_PETS_LIST]: updatePetsList,
  [Types.UPDATE_PET_AMOUNT_COLLECTED]: updatePetAmountCollected,
});
