import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';  // export App
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './core/contexts/UserContext';
import { store } from './store';

window.React = React
window.ReactDOM = ReactDOM


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
