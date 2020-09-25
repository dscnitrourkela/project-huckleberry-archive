import * as firebase from 'firebase/app';
import 'firebase/auth';

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
