import firebase from "firebase";
import moment from 'moment'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.database();
export const provider = new firebase.auth.FacebookAuthProvider();

provider.setCustomParameters({
    'display': 'popup'
});

export const postOffer = (offer, userId) => {

    let newOfferKey = firebaseDb.ref().child('offers').push().key;

    firebaseDb.ref('offers/' + newOfferKey).set({...offer, userId});
};

export const setUser = (email, name, id, uid) => {
    firebaseDb.ref('users/' + uid).update({name, email, id});
};

export const sendContact = (name, email, text) => {

    let newContactKey = firebaseDb.ref().child('contacts').push().key;

    firebaseDb.ref('contacts/' + newContactKey).set({name, email, text});
};

export const getOffers = () => {
    return firebaseDb.ref('offers/')
        .orderByChild("dateExpiration")
        .startAt(moment().valueOf())
        .once('value')
        .then(snap => snap)
        .then(
            response => ({response}),
            error => ({error: error.message || 'Something bad happened'})
        )
};

export const login = () => {
    return firebaseApp.auth().signInWithPopup(provider)
        .then(result => {
            const accessToken = result.credential.accessToken;
            const {uid, email} = result.user;
            return {accessToken, email, uid};

        }).then(
            response => response,
            error => ({error: error || 'Something bad happened'})
        );
};

export const logout = () => {
    return firebase.auth().signOut()
        .then(() => {
            return {};
        })
        .catch(function (error) {
            return error;
        })
        .then(
            response => response,
            error => ({error: error || 'Something bad happened'})
        );
};
