import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const fetch = require('node-fetch');
const axios = require('axios');
import { API } from '../../../constants/api';
<<<<<<< HEAD
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
=======

>>>>>>> upstream/release
const Profile = () => {
  const [isEligible, setEligible] = React.useState(0);

  const { user, isAuthenticated, isLoading } = useAuth0();

<<<<<<< HEAD
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (isEligible === 0) {
    axios
=======
  axios
>>>>>>> upstream/release
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
<<<<<<< HEAD
            handleClick()
=======
>>>>>>> upstream/release
          } else {
            setEligible(-1);
          }
        });
    });
<<<<<<< HEAD
=======

  if (isEligible === 0) {
>>>>>>> upstream/release
    return <div>Loading ...</div>;
  }

  if (isEligible === 1) {
    return (
      isAuthenticated && (
        <div>
<<<<<<< HEAD
          <h4>Congratulations {user.name}.</h4>
          <p>Share your badge from profile to the world!</p>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success">
    Yaay! You did it
  </Alert>
</Snackbar>
=======
          <h4>Congratulations {user.name}. Share your badge from profile to the world!</h4>
>>>>>>> upstream/release
        </div>
      )
    );
  }
  return (
    isAuthenticated && (
      <div>
        <h4>
<<<<<<< HEAD
          Sorry {user.name}, </h4>
          <p>It seems like you could not finish Hacktoberfest 2020. We look forward to you in our
          upcoming events. Happy Contributing
        </p>
=======
          Sorry {user.name}, it seems like you could not finish Hacktoberfest 2020. We look forward to you in our
          upcoming events. Happy Contributing
        </h4>
>>>>>>> upstream/release
      </div>
    )
  );
};

export default Profile;
