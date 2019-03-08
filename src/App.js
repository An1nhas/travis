import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';

import './App.css';

const App = () => (

  <BrowserRouter>
    <div>
      <Route exact path='/' component={Home} />
    </div>

  </BrowserRouter>
);

export default App;
