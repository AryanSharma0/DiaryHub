import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./Redux/store";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "react-toastify/scss/main.scss"; 


const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor=persistStore(store)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
