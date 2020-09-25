import { AUTH } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH.LOGIN:
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
        },
      };
    case AUTH.BADGE_LOGIN:
      return {
        ...state,
        auth: {
          ...state.auth,
          badge_auth: action.payload,
        },
      };
    case AUTH.LOGOUT:
      return {
        ...state,
        auth: null,
      };
  }
};
