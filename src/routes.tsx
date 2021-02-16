import React from 'react';
import {NativeRouter, Route, Switch} from 'react-router-native';
import Main from './pages/Main';

const Routes = () => {
  return (
    <NativeRouter>
      <Switch>
        <Route path="/" exact component={Main} />
      </Switch>
    </NativeRouter>
  );
};

export default Routes;
