import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCtdJxPglm728N_nJkM8JABHWrufZw0h-M",
  authDomain: "digitalmenu-38ade.firebaseapp.com",
  databaseURL: "https://digitalmenu-38ade.firebaseio.com",
  projectId: "digitalmenu-38ade",
  storageBucket: "digitalmenu-38ade.appspot.com",
  messagingSenderId: "59952233302",
  appId: "1:59952233302:web:89074a13b500e986a774f7",
  measurementId: "G-QFPSYRG0XQ"
};

//   var config = {
//     apiKey: "xxxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxxxxx",
//     authDomain: "xxxxxxxxxxxxxxxxxxxxxxx",
//     databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//     projectId: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
//     storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxx",
//     messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
//     appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxx"
//   };
// Initialize Firebase
// const fire = app.initializeApp(config);
const fire  = firebase.initializeApp(config);
export default fire;



