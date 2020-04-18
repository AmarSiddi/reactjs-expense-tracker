import React, { Component } from 'react';
import "./App.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
import{BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Home from "./Dashboard/Home";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Category from "./Category/Category";
import Expenses from "./Expense/Expenses";
//import AppNav from "./Utils/AppNav";
import SignOut from "./Dashboard/SignOut"


export class App extends Component {
  state = { };

  render() {
    return (

      <Router>
        <Switch>
          {/* <Route path="/" exact={true} component={SignIn}/> */}
          <Route path="/signin" exact={true} component={SignIn}/>
          <Route path="/signup" exact={true} component={SignUp}/>
          <Route path="/sigout" exact={true} component={SignOut}/>
          {/* <Route path="/home" exact={true} component={Home}/>
          <Route path='/categories' exact={true} component={Category}/>
          <Route path='/expenses' exact={true} component={Expenses}/> */}
          <ProtectedRoute exact={true} path="/home" component={Home}/> 
          <ProtectedRoute exact={true} path="/categories" component={Category}/>
          <ProtectedRoute exact={true} path="/expenses" component={Expenses}/>
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>

    );
  }
}

export default App;
