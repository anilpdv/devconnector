import React from "react";
import { Provider } from "react-redux";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Landing from "./components/layout/landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      {" "}
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" render={props => <Landing {...props} />} />
          <Route path="/register" render={props => <Register {...props} />} />
          <Route path="/login" render={props => <Login {...props} />} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;