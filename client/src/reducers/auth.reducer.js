import { AUTH } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH.LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedId: true,
      };
    case AUTH.BADGE_LOGIN:
      return {
        ...state,
        badge_auth: action.payload,
      };
    case AUTH.LOGOUT:
      return {
        ...state,
        user: action.payload,
        badge_auth: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
