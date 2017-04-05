import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import {Provider} from 'react-redux';

import App from './components/App';
import mainReducer from './reducers';


const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
const store = createStoreWithMiddleware(mainReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'));
