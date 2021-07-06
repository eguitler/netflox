import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from 'AppWrapper';
import firebase from 'firebase'
import { firebaseConfig } from 'firebase-config'

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);