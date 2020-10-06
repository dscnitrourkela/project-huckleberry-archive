import axios from 'axios';

// constants
import { AUTH } from './types';
import { API } from '../constants/api';

// helpers
import firebase from '../helpers/firebase';
import { uploadImage } from '../helpers/uploadImage';

// Login Action
export const login = (displayName, photoURL, email, uid) => async (dispatch) => {
  localStorage.setItem('uid', uid);
  try {
    const userRef = firebase.firestore().collection('users').doc(uid);
    const existingUser = await userRef.get();

    if (!existingUser.exists) {
      const upload_image_url = await uploadImage(photoURL);
      const newUser = {
        displayName: displayName,
        photoURL: upload_image_url,
        email: email,
      };
      userRef.set(newUser);
    }
  } catch (error) {
    console.log(error);
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: AUTH.LOGOUT, payload: null });
};

// Fetch the existing user
export const fetchUser = (uid) => async (dispatch) => {
  try {
    const existingUser = await firebase.firestore().collection('users').doc(uid).get();
    if (existingUser.exists) {
      const user = {
        displayName: existingUser.data().displayName,
        photoURL: existingUser.data().photoURL,
        email: existingUser.data().email,
        uid: existingUser.id,
      };
      return dispatch({ type: AUTH.LOGIN, payload: user });
    }
  } catch (error) {
    console.log(error);
  }
};

// Authenticate and generate uuid from badges server
export const setBadgesToken = (token) => async (dispatch) => {
  try {
    // Generate access_token from server from google oauth token
    const {
      data: { access_token },
    } = await axios.post(API.BADGES.CONVERT_TOKEN, {
      grant_type: 'convert_token',
      client_id: process.env.REACT_APP_CLIENT_ID,
      backend: 'google-oauth2',
      token: token,
    });

    // Generate uuid from the access_token and dispatch it
    if (access_token) {
      const config = { headers: { Authorization: `Bearer ${access_token}` } };

      const {
        data: { uuid },
      } = await axios.get(API.BADGES.SESSIONS, config);
      if (uuid) {
        localStorage.setItem('uuid', uuid);
        localStorage.setItem('access_token', access_token);

        // On first login, grant badge
        axios.post(API.BADGES.GRANT, { badge: 'party_blob' }, config);
        dispatch({ type: AUTH.BADGE_LOGIN, payload: uuid });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
