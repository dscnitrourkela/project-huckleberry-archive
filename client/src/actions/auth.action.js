import axios from 'axios';
import { AUTH } from './types';
import { API } from '../constants/api';

export const login = (user) => async (dispatch) => {
  dispatch({ type: AUTH.LOGIN, payload: user });
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: AUTH.LOGOUT, payload: null });
};

export const setBadgesToken = (token) => async (dispatch) => {
  try {
    console.log(process.env.REACT_APP_CLIENT_ID);
    const {
      data: { access_token },
    } = await axios.post(API.BADGES.CONVERT_TOKEN, {
      grant_type: 'convert_token',
      client_id: process.env.REACT_APP_CLIENT_ID,
      backend: 'google-oauth2',
      token: token,
    });

    if (access_token) {
      const config = { headers: { Authorization: `Bearer ${access_token}` } };

      const {
        data: { uuid },
      } = await axios.get(API.BADGES.SESSIONS, config);
      if (uuid) {
        localStorage.setItem('uuid', uuid);
        localStorage.setItem('access_token', access_token);

        axios.post(API.BADGES.GRANT, { badge: 'party_blob' }, config);
        dispatch({ type: AUTH.BADGE_LOGIN, payload: uuid });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
