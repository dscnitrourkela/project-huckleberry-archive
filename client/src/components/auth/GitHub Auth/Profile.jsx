import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const fetch = require('node-fetch');
const axios = require('axios');
import { API } from '../../../constants/api';

const Profile = () => {
  const [isEligible, setEligible] = React.useState(0);

  const { user, isAuthenticated, isLoading } = useAuth0();

  axios
    .post('https://hacktoberfest.dscnitrourkela.org/token', { username: user.sub }) // expecting a json response
    .then((res) => {
      axios
        .post('https://hacktoberfest.dscnitrourkela.org/hacktoberfest', { token: res.data.access_token })
        .then((res2) => {
          if (res2.data.success) {
            const BadgesJWT = localStorage.getItem('access_token');
            const config = { headers: { Authorization: `Bearer ${BadgesJWT}` } };
            axios.post(API.BADGES.GRANT, { badge: 'hacktoberfest_2020' }, config);
            setEligible(1);
          } else {
            setEligible(-1);
          }
        });
    });

  if (isEligible === 0) {
    return <div>Loading ...</div>;
  }

  if (isEligible === 1) {
    return (
      isAuthenticated && (
        <div>
          <h4>Congratulations {user.name}. Share your badge from profile to the world!</h4>
        </div>
      )
    );
  }
  return (
    isAuthenticated && (
      <div>
        <h4>
          Sorry {user.name}, it seems like you could not finish Hacktoberfest 2020. We look forward to you in our
          upcoming events. Happy Contributing
        </h4>
      </div>
    )
  );
};

export default Profile;
