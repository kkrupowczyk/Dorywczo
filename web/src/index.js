import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureStore from "./redux/store.js";
import routes from "./router.js";
import {addLocaleData,IntlProvider} from 'react-intl';
import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';
import localeData from './../public/locales/data.json';

addLocaleData([...en, ...pl]);
const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

async function init() {
    const store = await configureStore();
    ReactDOM.render(
        <IntlProvider locale={language} messages={messages}>
            <Provider store={store}>
                {routes(store)}
            </Provider>
        </IntlProvider>,
        document.getElementById('app')
    );
}

init();
