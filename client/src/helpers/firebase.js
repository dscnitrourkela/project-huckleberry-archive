import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1mDD2MLmghXbxZ4YSTK61KfYKrw2xAtQ',
  authDomain: 'project-banana-4822.firebaseapp.com',
  databaseURL: 'https://project-banana-4822.firebaseio.com',
  projectId: 'project-banana-4822',
  storageBucket: 'project-banana-4822.appspot.com',
  messagingSenderId: '120654780626',
  appId: '1:120654780626:web:6bf2490f1eb56fc5da350b',
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
