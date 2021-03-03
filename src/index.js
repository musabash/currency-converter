import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AllContextProvider} from './all-context'

ReactDOM.render(
  <AllContextProvider>
    <App />
  </AllContextProvider>,
  document.getElementById('root')
);
