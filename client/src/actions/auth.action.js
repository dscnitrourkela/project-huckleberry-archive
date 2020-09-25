import axios from 'axios';

import firebase from '../firebase';
import { AUTH } from './types';

export const login = (user) => async (dispatch) => {
  console.log('action login', user);
  dispatch({ type: AUTH.LOGIN, payload: user });
};

export const logout = () => (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: AUTH.LOGOUT, payload: null });
    })
    .catch((error) => console.log(error));
};

export const setBadgesToken = (token) => async (dispatch) => {
  console.log('action token', token);
  try {
    const {
      data: { access_token },
    } = await axios.post('https://badges.dscnitrourkela.tech/api/auth/convert-token', {
      grant_type: 'convert_token',
      client_id: 'BJlOifRQBb0zg0vVrbz0h62iaRhSrli8OJkt5Jz1',
      backend: 'google-oauth2',
      token: token,
    });

    if (access_token) {
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      const {
        data: { uuid },
      } = await axios.get('https://badges.dscnitrourkela.tech/api/sessions', config);
      localStorage.setItem('uuid', uuid);
      dispatch({ type: AUTH.BADGE_LOGIN, payload: true });
    }
  } catch (error) {
    console.log(error);
  }
};
