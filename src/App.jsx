import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import About from './components/About';
import Tigrinya from './components/Tigrinya';


import './App.css';

const App = () => (

  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/Tigrinya" component={Tigrinya} />
      </Switch>
    </div>

  </BrowserRouter>
);

export default App;
