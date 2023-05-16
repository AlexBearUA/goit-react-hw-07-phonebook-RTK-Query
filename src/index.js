import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from 'components/App';
// import { LoaderProvider } from 'services/loaderContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <LoaderProvider> */}
      <App />
      {/* </LoaderProvider> */}
    </Provider>
  </React.StrictMode>
);
