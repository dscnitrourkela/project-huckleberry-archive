import { AUTH } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case AUTH.BADGE_LOGIN:
      return {
        ...state,
        uuid: action.payload,
      };
    case AUTH.LOGOUT:
      return {
        ...state,
        user: action.payload,
        uuid: null,
      };
    default:
      return state;
  }
};
