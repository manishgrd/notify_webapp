import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import Notifier from './components/Notifier'
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC1vO8nYgT1LrzLHpVnwvk4_q2sL-SgITM",
    authDomain: "hpdfgt.firebaseapp.com",
    databaseURL: "https://hpdfgt.firebaseio.com",
    projectId: "hpdfgt",
    storageBucket: "hpdfgt.appspot.com",
    messagingSenderId: "77453129528"
  };
  firebase.initializeApp(config);

render((
  <BrowserRouter>
    <Notifier />
  </BrowserRouter>
), document.getElementById('root'));


registerServiceWorker();
