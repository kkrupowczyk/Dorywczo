import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import {history} from "./redux/store.js";
import App from "./containers/App/App";
import NotFound from "./containers/NotFound/NotFound";
import Login from "./containers/Login/Login";
import Offers from "./containers/Offers/Offers";
import NewOffer from "./containers/NewOffer/NewOffer";
import {syncHistoryWithStore} from "react-router-redux";
import {browserHistory} from "react-router";

import ReactGA from 'react-ga';
ReactGA.initialize('UA-101689377-1');

function logPageView() {
    ReactGA.set({page: window.location.pathname + window.location.search});
    ReactGA.pageview(window.location.pathname + window.location.search);
}

export default (store) => {
    const checkAuth = (nextState, replace, cb) => {
        const {user} = store.getState();

        //todo redirect to more proper site
        if (!user)
            replace('/offers');

        cb();
    };

    return (
        <Router onUpdate={() => {
            window.scrollTo(0, 0);
            logPageView();
        }} history={syncHistoryWithStore(browserHistory, store)}>

            <Route path="/" component={App}>
                <IndexRoute component={Offers}/>

                <Route onEnter={checkAuth}>
                    <Route path="new-offer" component={NewOffer}/>
                </Route>

                <Route path="offers(/:id)" component={Offers}/>
                <Route path="*" component={NotFound} status={404}/>
            </Route>

        </Router>
    )
};