import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import Landing from './components/views/Landing';
import Home from './components/views/Home';
import Create from './components/views/Create';
import Detail from './components/views/Detail';

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