import axios from 'axios';

import { AUTH } from './types';

export const login = (user) => async (dispatch) => {
  console.log('action login', user);
  dispatch({ type: AUTH.LOGIN, payload: user });
};

export const logout = () => (dispatch) => {
  console.log('action logout');
  dispatch({ type: AUTH.LOGOUT, payload: null });
};

export const setBadgesToken = (token) => async (dispatch) => {
  console.log('action token', token);

  axios
    .post('https://badges.dscnitrourkela.tech/api/auth/convert-token', {
      grant_type: 'convert_token',
      client_id: 'BJlOifRQBb0zg0vVrbz0h62iaRhSrli8OJkt5Jz1',
      backend: 'google-oauth2',
      token: token,
    })
    .then(({ data: { access_token } }) => {
      const config = { headers: { Authorization: `Bearer ${access_token}` } };

      axios.get('https://badges.dscnitrourkela.tech/api/sessions', config).then(({ data: { uuid } }) => {
        dispatch({ type: AUTH.BADGE_LOGIN, payload: uuid });
      });
    })
    .catch((error) => console.log(error));
};
