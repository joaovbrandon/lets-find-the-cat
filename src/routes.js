import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Main, NotFound } from './pages';

const Routes = () => (
  <BrowserRouter basename="/lets-find-the-cat/">
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
