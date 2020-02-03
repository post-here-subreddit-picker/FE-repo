import React from 'react';
import PrivateRoute from "./components/PrivateRoute"
import {BrowserTouter as ROuter, Route, Switch, Link } from "react-router-dom"
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
      <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      <PrivateRoute path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
