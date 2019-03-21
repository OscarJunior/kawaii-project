import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';

// const RELEASE = '0.1.0';
// if (process.env.NODE_ENV === 'production') {
  
// }
Sentry.init({
    dsn: "https://2e8d9981855b41088b226a6800bd57ae@sentry.io/1420810"
});
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
