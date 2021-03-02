import {takeLatest,takeEvery} from "redux-saga";
import {fork,take} from "redux-saga/effects";
import {logoutTask, loginTask} from "./user";
import {postOfferTask,getOffersTask} from "./offers";
import {contactTask} from "./contact";

import {LOGOUT_USER_REQUEST, LOGIN_USER_REQUEST} from './user'
import {POST_OFFER_REQUEST,GET_OFFERS_REQUEST} from './offers'
import {POST_CONTACT_REQUEST} from './contact'

export function* saga() {
    yield [
        fork(takeLatest, LOGIN_USER_REQUEST, loginTask),
        fork(takeLatest, LOGOUT_USER_REQUEST, logoutTask),

        fork(takeLatest, POST_OFFER_REQUEST, postOfferTask),
        fork(takeLatest, GET_OFFERS_REQUEST, getOffersTask),

       fork(takeLatest, POST_CONTACT_REQUEST, contactTask),

    ];
}
