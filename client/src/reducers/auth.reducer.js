import { AUTH } from '../actions/types';

const initialState = {
  user: null,
  uuid: null,
  profile_status: 'shared',
};

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
    case AUTH.PROFILE_STATUS:
      return {
        ...state,
        profile_status: action.payload,
      };
    default:
      return state;
  }
};
