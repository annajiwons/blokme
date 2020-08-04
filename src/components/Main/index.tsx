// Third Party
import React from 'react';

// Components
import { Route, Switch } from 'react-router-dom';
import Lobby from '../Lobby';
import Start from '../Start';

const Main: React.FC = () => {
  return (
    <>
      <Switch>
        <Route component={Start} exact path="/" />
        <Route component={Lobby} path="/:roomName" />
      </Switch>
    </>
  );
};

export default Main;
