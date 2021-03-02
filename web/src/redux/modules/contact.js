import {action} from "../utils";
import {put, select, call} from "redux-saga/effects";
import {sendContact} from "../../services/firebase";

export const POST_CONTACT_REQUEST = 'POST_CONTACT_REQUEST';
export const POST_CONTACT_SUCCESS = 'CONTACT_SUCCESS';
export const POST_CONTACT_FAIL = 'CONTACT_FAIL';

export const contactRequest = () => action(POST_CONTACT_REQUEST);
export const contactSuccess = () => action(POST_CONTACT_SUCCESS);
export const contactFail = () => action(POST_CONTACT_FAIL);

export const getFormContact = (state) => state.form.contact.values;

export function* contactTask() {
    const contact = yield select(getFormContact);
    yield call (sendContact, contact.name, contact.email, contact.text );
}



