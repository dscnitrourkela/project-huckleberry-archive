import axios from 'axios';
import { BADGES } from './types';

export const fetchUserBadges = (uuid) => async (dispatch) => {
  const { data } = await axios.get(`https://badges.dscnitrourkela.tech/api/badges/collection/${uuid}`);
  if (data) {
    dispatch({ type: BADGES.FETCH, payload: data });
  }
};

export const onSignInBadge = (uuid) => async (dispatch) => {
  const config = { headers: { Authorization: `Bearer ${uuid}` } };

  const { data } = await axios.post(`https://badges.dscnitrourkela.tech/api/badges/`, { badge: 'party_blob' }, config);

  if (data) {
    const { data: badges } = await axios.get(`https://badges.dscnitrourkela.tech/api/badges/collection/${uuid}`);
    if (badges) {
      dispatch({ type: BADGES.FETCH, payload: badges });
    }
  }
};

export const countDownBadge = () => async (dispatch) => {
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } };

  const { data } = await axios.post(`https://badges.dscnitrourkela.tech/api/sessions`, { track: 1 }, config);

  if (data) {
    const { data: badges } = await axios.get(
      `https://badges.dscnitrourkela.tech/api/badges/collection/${localStorage.getItem('uuid')}`
    );
    if (badges) {
      dispatch({ type: BADGES.FETCH, payload: badges });
    }
  }
};

export const counterFirstLoad = (value) => (dispatch) => {
  dispatch({ type: BADGES.FIRST_LOAD, payload: value });
};
