import axios from 'axios';

import { AUTH } from './types';

export const login = (user) => async (dispatch) => {
  dispatch({ type: AUTH.LOGIN, payload: user });
};

export const logout = () => (dispatch) => {
  dispatch({ type: AUTH.LOGOUT, payload: null });
};

export const setBadgesToken = (token) => async (dispatch) => {
  await axios
    .post('https://badges.dscnitrourkela.tech/api/auth/convert-token', {
      grant_type: 'convert_token',
      client_id: 'BJlOifRQBb0zg0vVrbz0h62iaRhSrli8OJkt5Jz1',
      backend: 'google-oauth2',
      token: token,
    })
    .then(({ data: { access_token } }) => {
      const config = { headers: { Authorization: `Bearer ${access_token}` } };

      axios.get('https://badges.dscnitrourkela.tech/api/sessions', config).then(({ data: { uuid } }) => {
        localStorage.setItem('uuid', uuid);

        const config = { headers: { Authorization: `Bearer ${access_token}` } };
        axios.post(`https://badges.dscnitrourkela.tech/api/badges`, { badge: 'party_blob' }, config);

        dispatch({ type: AUTH.BADGE_LOGIN, payload: uuid });
      });
    })
    .catch((error) => console.log(error));
};