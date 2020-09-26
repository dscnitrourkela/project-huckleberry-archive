import { BADGES } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case BADGES.FETCH:
      return {
        ...state,
        badges: action.payload,
      };
    default:
      return state;
  }
};
