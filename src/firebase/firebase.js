// Import the functions you need from the SDKs you need
// import {
//     initializeApp
// } from "firebase/app";
import {
    getAnalytics
} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const admin = require('firebase-admin');
const config = require('../config/config')
// Your web app's Firebase configuration
const {
    FB_API_KEY,
    FB_AUTH_DOMAIN,
    FB_PROJECT_ID,
    FB_STORAGE_BUCKET,
    FB_MESSAGING_SENDER_ID,
    FB_APP_ID,
    FB_MEASUREMENT_ID,
}
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    projectId: FB_PROJECT_ID,
    storageBucket: FB_STORAGE_BUCKET,
    messagingSenderId: FB_MESSAGING_SENDER_ID,
    appId: FB_APP_ID,
    measurementId: FB_MEASUREMENT_ID
};

// Initialize Firebase
admin.initializeApp({
    Credential: admin.credential.cert(config.firebaseConfig.certConfig)
});

const auth = admin.auth();
// const auth = admin.auth();
const analytics = getAnalytics(app);

module.exports = {
    app: app,
    auth: auth,
}