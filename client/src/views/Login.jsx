import React,{useEffect} from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios';

import { Button } from '@material-ui/core';

const firebaseConfig = {
    apiKey: "AIzaSyB1mDD2MLmghXbxZ4YSTK61KfYKrw2xAtQ",
    authDomain: "project-banana-4822.firebaseapp.com",
    databaseURL: "https://project-banana-4822.firebaseio.com",
    projectId: "project-banana-4822",
    storageBucket: "project-banana-4822.appspot.com",
    messagingSenderId: "120654780626",
    appId: "1:120654780626:web:bb5a034a16b3ad10da350b",
    measurementId: "G-92NW0Q5WD0"
}
  


function Login() {
    useEffect(()=> {
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const token = result.credential.accessToken;
                axios.post("http://liveapi.dscnitrourkela.tech/api/auth/convert-token",{
                    "grant_type": "convert_token",
                    "client_id": "QVyRzVotKQIiXbEbg82g4aP87KEJ6wImYHiwTWDL",
                    "backend": "google-oauth2",
                    "token": token
                }).then((res)=>{
                    const parsedJSON=JSON.parse(res);
                    console.log(parsedJSON)
                })
            }
            // The signed-in user info.
            var user = result.user;
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });

    },[])
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const provider = new firebase.auth.GoogleAuthProvider();
    const loginBtnHandler=()=>{
        firebase.auth().signInWithRedirect(provider);        
    }
    return (
        <div>
        <h1>Login</h1>
        <Button variant="contained" color="primary" onClick={loginBtnHandler}>Sign in With Google</Button>
        </div>
    );
}

export default Login;
