import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Card from '../components/Card';

const mapStateToProps = (state) => ({
  uuid: state.auth.uuid,
});

function Profile({ uuid }) {
  const [profile, setProfile] = useState({});
  console.log(uuid);
  useEffect(() => {
    if (uuid) {
      axios
        .get('https://badges.dscnitrourkela.tech/api/badges/collection/' + uuid)
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {profile.badges !== undefined ? <h2>Email : {profile.email}</h2> : null}
      {profile.badges !== undefined ? (
        profile.badges.map((each, index) => (
          <Card image={each.image} name={each.name} key={index}>
            badge
          </Card>
        ))
      ) : (
        <h2>No badges</h2>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(Profile);
