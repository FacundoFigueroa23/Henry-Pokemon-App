import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import Landing from './components/Landing';
import Home from './components/Home';
import Create from './components/Create';
import Detail from './components/Detail';

function App() {
  return (
    <Switch>
      <Route path="/home/:id" component={Detail} />
      <Route path="/home" component={Home} />
      <Route path="/create" component={Create} />
      <Route path="/" component={Landing} />
    </Switch>
  );
}

export default App;
