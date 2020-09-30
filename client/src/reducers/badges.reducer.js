import { BADGES } from '../actions/types';

const initialState = {
  badges: [],
  firstLoad: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BADGES.FETCH:
      return {
        ...state,
        badges: action.payload,
      };
    case BADGES.FIRST_LOAD:
      return {
        ...state,
        firstLoad: action.payload,
      };
    default:
      return state;
  }
};
