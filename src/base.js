import firebase from "firebase";
import "firebase/storage";

export const app = firebase.initializeApp({
  "projectId": "leaflet-react",
  "appId": "1:249401140596:web:ac74ac5613c10e6d19b821",
  "storageBucket": "leaflet-react.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyBJOu7zQTBJHahpqP_g7M6Xy8yORbaRblM",
  "authDomain": "leaflet-react.firebaseapp.com",
  "messagingSenderId": "249401140596"
});
