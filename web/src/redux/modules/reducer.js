import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "redux-form";
import user from "./user";
import errors from "./errors";
import offers from "./offers";

export const reducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    user: user,
    errors: errors,
    offers: offers
});
