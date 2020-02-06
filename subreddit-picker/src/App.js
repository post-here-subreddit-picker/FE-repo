import React from 'react';
import PrivateRoute from "./components/PrivateRoute"
import {Route, Switch, Link } from "react-router-dom"
// import FormikLogin from "./components/Login"
// import SignUp from "./components/SignUp"
import Home from "./components/Home"
import Nav from "./components/Nav"
import NewLogin from "./components/NewLogin"
import NewSignUp from "./components/NewSignUp"
import './App.css';
import Image from "./components/Image"

function App() {
  return (
    <div className="App">
       <Nav/>
       <Image/>
      <Switch>
      <Route exact path="/" component={NewLogin} />
      <Route exact path="/sign-up" component={NewSignUp} />
      <PrivateRoute path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
