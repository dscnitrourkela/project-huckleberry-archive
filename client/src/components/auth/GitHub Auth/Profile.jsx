import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const fetch = require('node-fetch');
const axios = require('axios');
import { API } from '../../../constants/api';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const repoBadgeRelation={
"opencodenitr/project-apollo":"moonshot_apollo",
"dscnitrourkela/project-avocado":"moonshot_avocado",
"dscnitrourkela/project-avocado-web":"moonshot_avocado",
"dscnitrourkela/project-raasan": "moonshot_raasan",
"Chinmay-KB/wp_pivot_flutter": "moonshop_wp_plugin",
"Chinmay-KB/project-kopie": "moonshot_kopie",
"Webwiznitr/MilkERP": "	moonshot_milk",
"Chinmay-KB/project-spampr": "moonshot_spampr",
"opencodenitr/hephaestus": "moonshot_hepaestus",
"dscnitrourkela/project-guava": "moonsho_guava"
}


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Profile = () => {
  const [isEligible, setEligible] = React.useState(0);
  const [repoCount, setRepoCount] = React.useState(0)

  const { user, isAuthenticated, isLoading } = useAuth0();

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
            handleClick()
          } 
          else {
            setEligible(-1);
          }
          if(res2.data.eligibleRepos.length>0){
            for(let i=0;i<res2.data.eligibleRepos.length;i++){
              const BadgesJWT = localStorage.getItem('access_token');
              const config = { headers: { Authorization: `Bearer ${BadgesJWT}` } };
              axios.post(API.BADGES.GRANT, { badge: repoBadgeRelation[res2.data.eligibleRepos[i]] }, config);
            }
          }
        });
    });
    return <div>Loading ...</div>;
  }

  if (isEligible === 1) {
    return (
      isAuthenticated && (
        <div>
          <h4>Congratulations {user.name}.</h4>
          <p>Share your badge from profile to the world! <br/>
             Check profile to see if you got special repo badges.</p>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success">
    Yaay! You did it.
  </Alert>
</Snackbar>
        </div>
      )
    );
  }
  return (
    isAuthenticated && (
      <div>
        <h4>
          Sorry {user.name}, </h4>
          <p>It seems like you could not finish Hacktoberfest 2020. We look forward to you in our
          upcoming events. Happy Contributing
        </p>
      </div>
    )
  );
};

export default Profile;
