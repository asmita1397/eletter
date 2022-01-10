import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDCQtgTmmh48T_10ajyGbieGamnAiRVhgE",
    authDomain: "fir-react-upload-bf94e.firebaseapp.com",
    databaseURL: "https://fir-react-upload-bf94e.firebaseio.com",
    projectId: "fir-react-upload-bf94e",
    storageBucket: "fir-react-upload-bf94e.appspot.com",
    messagingSenderId: "546755386840",
    appId: "1:546755386840:web:5ca70bb138b72b781166ad",
    measurementId: "G-LGZRK63Y1G"
  };
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  export{
      storage, firebase as default
  };