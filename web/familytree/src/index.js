import React from 'react';
import ReactDOM from 'react-dom';
import { configureUrlQuery } from 'react-url-query';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import history from './history';

configureUrlQuery({ history });

ReactDOM.render(<App style={{height: '100%'}}/>, document.getElementById('root'));
registerServiceWorker();
