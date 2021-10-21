import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from "axios";
import dotenv from "dotenv";
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";
console.log("Base_url = ", axios.defaults.baseURL)

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);