import React from 'react';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import store from './store';
import Routes from './routes';
import { Loader } from './components';
import { GlobalStyle } from './styles';

dotenv.config();

const App = () => (
  <Provider store={store}>
    <>
      <GlobalStyle />
      <Loader />
      <Routes />
    </>
  </Provider>
);

export default App;
