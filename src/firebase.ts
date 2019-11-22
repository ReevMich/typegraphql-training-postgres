import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA4U6Gl-ouM8XHfFfhi_zHew_yewpCKurI",
    authDomain: "graphql-service.firebaseapp.com",
    databaseURL: "https://graphql-service.firebaseio.com",
    projectId: "graphql-service",
    storageBucket: "graphql-service.appspot.com",
    messagingSenderId: "492743545078",
    appId: "1:492743545078:web:34aff548b0b2691a90dcd7",
    measurementId: "G-WV3938P4PZ"
}

firebase.initializeApp(config);

export const Auth = firebase.auth();