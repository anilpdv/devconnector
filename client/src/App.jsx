import React from "react";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Landing from "./components/layout/landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" render={props => <Landing />} />
          <Route path="/register" render={props => <Register />} />
          <Route path="/login" render={props => <Login />} />
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
