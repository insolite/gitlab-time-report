import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';

import App from './components/App';
import { createGitlabApiMiddleware } from './middlewares/gitlabApi';
import { GITLAB_URL, GITLAB_TOKEN } from './config';
import mainReducer from './reducers';


const createStoreWithMiddleware = applyMiddleware(
    createGitlabApiMiddleware(GITLAB_URL, GITLAB_TOKEN),
)(createStore);
const store = createStoreWithMiddleware(mainReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
