import {action} from '../utils'
import {call, put, select} from 'redux-saga/effects'
import {postOffer, getOffers} from '../../services/firebase'
import {getUser} from './user'

export const POST_OFFER_REQUEST = 'POST_OFFER_REQUEST';
export const POST_OFFER_SUCCESS = 'POST_OFFER_SUCCESS';
export const POST_OFFER_FAIL = 'POST_OFFER_FAIL';
export const GET_OFFERS_REQUEST = 'GET_OFFERS_REQUEST';
export const GET_OFFERS_SUCCESS = 'GET_OFFERS_SUCCESS';
export const GET_OFFERS_FAIL = 'GET_OFFERS_FAIL';

const initState = [];

export default function offers(state = initState, action) {
    switch (action.type) {

        case GET_OFFERS_SUCCESS:
            state = [];
            action.offers.forEach(v => {
                state.push({...v.val(), id: v.key, isMouseOver: false})
            });
            return state;

        default:
            return state;
    }
}

export const postOfferRequest = () => action(POST_OFFER_REQUEST);
export const postOfferSuccess = () => action(POST_OFFER_SUCCESS, {});
export const postOfferFail = (error) => action(POST_OFFER_FAIL, {error});
export const getOffersRequest = () => action(GET_OFFERS_REQUEST);
export const getOffersSuccess = (offers) => action(GET_OFFERS_SUCCESS, {offers});
export const getOffersFail = (error) => action(GET_OFFERS_FAIL, {error});

export const getFormOffer = (state) => state.form.offer.values;

export function* postOfferTask() {
    const offer = yield select(getFormOffer);
    const user = yield select(getUser);

    yield  call(postOffer, offer, user.id);
}

export function* getOffersTask() {
    const {response, error} = yield call(getOffers);

    yield (response) ?
        put(getOffersSuccess(response)) :
        put(getOffersFail(error));
}

