import React, { Component } from 'react';
import Header from "./Components/Header";
import Market from "./Pages/Market";
import Portfolio from "./Pages/Portfolio"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App extends Component {

    render() {
      return (
      <Router>
            <Route path='/' component={Header}/>
          <Switch>
            <Route exact path='/' component={Market}/>
            <Route exact path='/portfolio' component={Portfolio}/>
          </Switch> 
      </Router>
      )}
  }


export default App;