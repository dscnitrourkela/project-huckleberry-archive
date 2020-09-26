import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import badgesReducer from './badges.reducer';

export default combineReducers({
  auth: authReducer,
  badges: badgesReducer,
});
