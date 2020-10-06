import axios from 'axios';
import { BADGES } from './types';
import { API } from '../constants/api';

export const fetchUserBadges = (uuid) => async (dispatch) => {
  try {
    const {
      data: { badges },
    } = await axios.get(`${API.BADGES.PROFILE}${uuid}`);

    if (badges) {
      dispatch({ type: BADGES.FETCH, payload: badges });
    }
  } catch (error) {
    console.log(error);
  }
};

export const countDownBadge = (uuid) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      params: { track: 1 },
    };

    const { data } = await axios.post(API.BADGES.SESSIONS, null, config);

    if (data) {
      const {
        data: { badges },
      } = await axios.get(`${API.BADGES.PROFILE}${uuid}`);

      if (badges) {
        dispatch({ type: BADGES.FETCH, payload: badges });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const counterFirstLoad = (value) => (dispatch) => {
  dispatch({ type: BADGES.FIRST_LOAD, payload: value });
};
