
/*const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import App from './App/index.js';
import './main.css';

const history = createHistory();
ReactDOM.render(
    <div>
        <Router history={history}>
            <App />
        </Router>
    </div>,
    document.getElementById('root'));


