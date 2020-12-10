import firebase from 'firebase/app';
// import 'firebase/auth';
 import 'firebase/firestore';
// import 'firebase/database';

var fire=  firebase.initializeApp({
  apiKey: "AIzaSyBONg5D7E_x_sYIZCpwbIXUCh-rZ1_WlLA",
  authDomain: "student-reg-form-assignment-2.firebaseapp.com",
  databaseURL: "https://student-reg-form-assignment-2.firebaseio.com",
  projectId: "student-reg-form-assignment-2",
  storageBucket: "student-reg-form-assignment-2.appspot.com",
  messagingSenderId: "775948690248",
  appId: "1:775948690248:web:6a96d679a93ad97638c97d",
  measurementId: "G-L2KMKETFR1"
  })
var db= fire.firestore();
// var db= fire.database();
export default db;
