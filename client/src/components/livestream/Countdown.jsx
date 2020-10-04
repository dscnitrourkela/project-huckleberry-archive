import React, { useState, useEffect } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { countDownBadge } from '../../actions/badges.action';

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapActionsToProps = {
  countDownBadge,
};

function Counter({ user, countDownBadge }) {
  const classes = useStyles();
  const [key, setKey] = useState(0);

  // Counter minutes and seconds renderer
  const renderer = ({ minutes, seconds }) => (
    <span style={{ fontSize: 20 }}>
      <Button className={classes.countdown}>{zeroPad(minutes)}</Button>:
      <Button className={classes.countdown}>{zeroPad(seconds)}</Button>
    </span>
  );

  const onCounterComplete = () => {
    if (user) {
      // countDownBadge(localStorage.getItem('uuid'));
      setKey((key) => key + 1);
    }
  };
  console.log(key);

  return (
    <Countdown
      key={key}
      date={Date.now() + 10000}
      style={{ margin: '1em' }}
      renderer={renderer}
      onComplete={onCounterComplete}
      style={{ fontSize: 20 }}
    />
  );
}

export default connect(mapStateToProps, mapActionsToProps)(Counter);

const useStyles = makeStyles((theme) => ({
  countdown: {
    width: 50,
    backgroundColor: '#fff',
    border: '2px solid #4285F4',
    color: '#4285F4',
    fontWeight: 500,
    borderRadius: '0.2em',
    fontSize: '1.2em',
    padding: '0.5em',
    margin: '0.5em',
  },
}));
