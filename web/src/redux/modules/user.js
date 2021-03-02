import {action} from '../utils'
import {put, select, call} from 'redux-saga/effects'
import {login, logout, setUser} from '../../services/firebase'
import {getUserData} from '../../services/facebook'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAIL = 'LOGOUT_USER_FAIL';

const initState = null;

export default function user(state = initState, action) {
    switch (action.type) {

        case LOGIN_USER_SUCCESS:
            const {accessToken, email, name, id, uid} = action;
            return {accessToken, email, name, id, uid};

        case LOGOUT_USER_SUCCESS:
            return initState;

        case LOGOUT_USER_FAIL:
            return initState;

        default:
            return state;
    }
}

export const loginUserRequest = () => action(LOGIN_USER_REQUEST);
export const loginUserSuccess = (accessToken, email, name, id, uid) => action(LOGIN_USER_SUCCESS, {
    accessToken,
    email,
    name,
    id,
    uid
});
export const loginUserFail = () => action(LOGIN_USER_FAIL);

export const logoutUserRequest = () => action(LOGOUT_USER_REQUEST);
export const logoutUserSuccess = () => action(LOGOUT_USER_SUCCESS);
export const logoutUserFail = () => action(LOGOUT_USER_FAIL);

export const getUser = (state) => state.user;

export function* loginTask() {
    const responseLogin = yield call(login);

    const responseUserData = yield (responseLogin) ?
        call(getUserData, responseLogin.accessToken) :
        put(loginUserFail());

    if (responseUserData) {
        yield  put(loginUserSuccess(responseLogin.accessToken, responseLogin.email, responseUserData.name, responseUserData.id, responseLogin.uid));
        yield call(setUser, responseLogin.email, responseUserData.name, responseUserData.id, responseLogin.uid);
    } else {
        yield put(loginUserFail());
    }
}

export function* logoutTask() {
    const response = yield call(logout);

    yield (response) ?
        put(logoutUserSuccess()) :
        put(logoutUserFail());
}



