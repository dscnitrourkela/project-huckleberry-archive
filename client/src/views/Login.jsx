import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import { Button } from '@material-ui/core';

const firebaseConfig = {
  apiKey: 'AIzaSyB1mDD2MLmghXbxZ4YSTK61KfYKrw2xAtQ',
  authDomain: 'project-banana-4822.firebaseapp.com',
  databaseURL: 'https://project-banana-4822.firebaseio.com',
  projectId: 'project-banana-4822',
  storageBucket: 'project-banana-4822.appspot.com',
  messagingSenderId: '120654780626',
  appId: '1:120654780626:web:bb5a034a16b3ad10da350b',
  measurementId: 'G-92NW0Q5WD0',
};

function Login(props) {
  const [loading, setLoading] = useState(false);
  

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  const loginBtnHandler = () => {
    firebase.auth().signInWithRedirect(provider);
  };

  return props.isAuth ? (
    <Redirect to='/profile' />
  ) : loading ? (
    <Spinner />
  ) : (
    <div>
      <Button variant='contained' color='primary' onClick={loginBtnHandler}>
        Sign in With Google
      </Button>
    </div>
  );
}

export default Login;
