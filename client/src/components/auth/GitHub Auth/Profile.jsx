import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const fetch = require('node-fetch');
const axios = require('axios')
import { API } from '../../../constants/api';


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  axios.post('https://hacktoberfest.dscnitrourkela.org/token', {username:"github|27865704"} ) // expecting a json response
    .then(res => {
      axios.post('https://hacktoberfest.dscnitrourkela.org/hacktoberfest',{token:res.data.access_token})
      .then(res2=>{
        if(res2.data.success){
          const BadgesJWT=localStorage.getItem('access_token')
          const config = { headers: { Authorization: `Bearer ${BadgesJWT}` } };
          axios.post(API.BADGES.GRANT, { badge: 'hacktoberfest_2020' }, config);
        }

      })
    });

  console.log("Abel")

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;