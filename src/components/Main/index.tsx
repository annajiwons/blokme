// Third Party
import React from 'react';

// Components
import { Route, Switch } from 'react-router-dom';
import Game from '../Game';
import Start from '../Start';

const Main: React.FC = () => {
  return (
    <>
      <Switch>
        <Route component={Start} exact path="/" />
        <Route component={Game} path="/:roomName" />
      </Switch>
    </>
  );
};

export default Main;
