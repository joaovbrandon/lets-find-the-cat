import React from 'react';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import store from './store';
import Routes from './routes';
import { GlobalStyle } from './styles';

dotenv.config();

const App = () => (
  <Provider store={store}>
    <>
      <GlobalStyle />
      <Routes />
    </>
  </Provider>
);

export default App;
