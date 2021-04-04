import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from "react-redux";

import './styles/index.scss';
import { App } from './app';
// import reportWebVitals from './reportWebVitals';

// import { store } from "./store";
// import { ScrollToTop } from './components/scroll-to-top';
// import { fetchGenres } from 'reducers/tmdb/configuration/thunks';

// store.dispatch(fetchGenres());

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      {/* <Provider store={store}> */}
        {/* <ScrollToTop /> */}
        <App />
      {/* </Provider> */}
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
