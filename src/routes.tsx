import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Report from './pages/Report';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/report/:fileName' exact component={Report} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
