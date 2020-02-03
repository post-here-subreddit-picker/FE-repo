import React from 'react';
import PrivateRoute from "./components/PrivateRoute"
import {Route, Switch, Link } from "react-router-dom"
import FormikLogin from "./components/Login"
import SignUp from "./components/SignUp"
import Home from "./components/Home"
import './App.css';
import styled from "styled-components"

function App() {
  return (
    <div className="App">
       <Link to={"/home"}>Home</Link>
       <Link to={"/"}>Login</Link>
       <Link to={"/sign-up"}>Sign Up</Link>
      <Switch>
      <Route exact path="/" component={FormikLogin} />
      <Route exact path="/sign-up" component={SignUp} />
      {/* <PrivateRoute path="/home" component={Home} /> this is where i'm typing */}
      <Route path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
