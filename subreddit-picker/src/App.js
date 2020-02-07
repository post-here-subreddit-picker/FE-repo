import React from 'react';
import PrivateRoute from "./components/PrivateRoute"
import {Route, Switch} from "react-router-dom"
// import FormikLogin from "./components/Login"
// import SignUp from "./components/SignUp"
import Home from "./components/Home"
import Nav from "./components/Nav"
import NewLogin from "./components/NewLogin"
import NewSignUp from "./components/NewSignUp"
import Image from "./components/Image"
import "./App.css"
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
