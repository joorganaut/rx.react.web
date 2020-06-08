import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/common/styles.css';
// import './assets/styles/base.scss'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/common/Pharmacy/css/aos.css';
import './components/common/Pharmacy/css/style.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import ContextManager from './components/common/contextManager';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  
  <React.StrictMode>
    <ContextManager>
      <App />
      <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
  </ContextManager>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
