import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';

import Landing from './components/Landing';
import Home from './components/Home';
import Create from './components/Create';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/create" component={Create} />
    </React.Fragment>
  );
}

export default App;
