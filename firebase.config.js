import Firebase from 'firebase'
var config = {
  apiKey: "AIzaSyB4bRKnaQA1EmzIFRhy-DRSUczaKs5oP0E",
  authDomain: "wap-app-20f8a.firebaseapp.com",
  databaseURL: "https://wap-app-20f8a.firebaseio.com",
  projectId: "wap-app-20f8a",
  storageBucket: "wap-app-20f8a.appspot.com",
  messagingSenderId: "311387195851"
};
export default Firebase.initializeApp(config);
