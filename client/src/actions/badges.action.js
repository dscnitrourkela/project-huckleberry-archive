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

  const { data } = await axios.post(
    `https://badges.dscnitrourkela.tech/api/badges/`,
    { badge: 'nitr_devs_signin' },
    config
  );

  if (data) {
    const { data: badges } = await axios.get(`https://badges.dscnitrourkela.tech/api/badges/collection/${uuid}`);
    if (badges) {
      dispatch({ type: BADGES.FETCH, payload: badges });
    }
  }
};
