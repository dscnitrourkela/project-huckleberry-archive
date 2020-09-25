import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchUserBadges } from '../actions/badges.action';

import Card from '../components/Card';

const mapStateToProps = (state) => ({
  uuid: state.auth.uuid,
  profile: state.badges.badges,
});

const mapActionsToProps = {
  fetchUserBadges,
};

function Profile({ uuid, profile, fetchUserBadges }) {
  useEffect(() => {
    if (uuid) {
      fetchUserBadges(uuid);
    }
  }, []);

  switch (profile) {
    case undefined:
      return <h2>Loading...</h2>;
    default:
      return (
        <div>
          <h3>Email: {profile.email}</h3>
          {profile.badges.length === 0 ? (
            <h3>No Badges Yet!</h3>
          ) : (
            profile.badges.map((each, index) => (
              <Card image={each.image} name={each.name} key={index}>
                badge
              </Card>
            ))
          )}
        </div>
      );
  }

  // return (
  //   <div>
  //     <h1>Profile</h1>
  //     {profile.badges !== undefined ? <h2>Email : {profile.email}</h2> : null}
  //     {profile.badges !== undefined ? (
  //       profile.badges.map((each, index) => (
  //         <Card image={each.image} name={each.name} key={index}>
  //           badge
  //         </Card>
  //       ))
  //     ) : (
  //       <h2>No badges</h2>
  //     )}
  //   </div>
  // );
}

export default connect(mapStateToProps, mapActionsToProps)(Profile);
