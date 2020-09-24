import React,{useEffect,useState} from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
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
  


function Login(props) {
    const [loading,setLoading]=useState(false);
    useEffect(()=> {
        if(localStorage.getItem('uuid')){
            props.setAuthVal(true);
        }else{
            setLoading(true);
            firebase.auth().getRedirectResult().then(function(result) {
                if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;              
                localStorage.setItem('userToken',token);
                    axios.post("https://badges.dscnitrourkela.tech/api/auth/convert-token",{
                        "grant_type": "convert_token",
                        "client_id": "BJlOifRQBb0zg0vVrbz0h62iaRhSrli8OJkt5Jz1",
                        "backend": "google-oauth2",
                        "token": token
                    }).then((res)=>{
                        props.setUserToken(res.data.access_token);
                        console.log(res.data.access_token);
                        const config = {
                            headers: { Authorization: `Bearer ${res.data.access_token}` }
                        };  
                        axios.get( 
                        "https://badges.dscnitrourkela.tech/api/sessions",
                        config
                        ).then((res)=>{
                            console.log(res.data);
                            localStorage.setItem('uuid',res.data.uuid)
                            props.setAuthVal(true);  
                        })
                        
                    })
                }else{
                    setLoading(false);
                }
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
        }
        
        

    },[])

    //hooks
    

    // Initialize Firebase
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig)
    }
    
    const provider = new firebase.auth.GoogleAuthProvider();
    const loginBtnHandler=()=>{        
        firebase.auth().signInWithRedirect(provider);    
    }


    return props.isAuth?(
            <Redirect to="/profile"/>
        ):(
            loading?<Spinner/>:(<div>
                <Button variant="contained" color="primary" onClick={loginBtnHandler}>Sign in With Google</Button>
                </div>)
        );
}

export default Login;
