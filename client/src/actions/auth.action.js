import axios from 'axios';

import firebase from '../firebase';
import AUTH from './types';

export const login = () => async (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithRedirect(provider);

  try {
    const result = await firebase.auth().getRedirectResult();
    if (result.credential) {
      const token = result.credential.accessToken;
      const user = result.user;
      localStorage.setItem('g_uuid', token);
      dispatch({ type: AUTH.LOGIN, payload: user });
    }
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};

export const setBadgesToken = (token) => async (dispatch) => {
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
