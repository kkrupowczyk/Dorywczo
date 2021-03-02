import {createStore, applyMiddleware, compose} from "redux";
import {browserHistory} from "react-router";
import {routerMiddleware} from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import {reducer} from "./modules/reducer";
import {saga} from "./modules/saga";
import createLogger from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist'
import {localStorage} from 'redux-persist/storages';

let middlewares = [];

const sagaMiddleware = createSagaMiddleware({onerror: (e) => console.error(e)});
const logger = createLogger();

middlewares.push(routerMiddleware(browserHistory));
middlewares.push(sagaMiddleware);
middlewares.push(logger);

let middleware = compose(applyMiddleware(...middlewares), autoRehydrate());

if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
    middleware = compose(middleware, window.devToolsExtension());
}

export default function configureStore() {
    return new Promise((resolve, reject) => {
        try {
            const store = createStore(reducer, middleware);

            persistStore(
                store,
                {storage: localStorage},
                () => {
                    sagaMiddleware.run(saga);
                    resolve(store);
                }
            );
        } catch (e) {
            reject(e);
        }
    });
}