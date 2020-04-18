import React, { Component } from "react";
//import Auth from "../Utils/Auth";

class SignOut extends Component {
  state = {};
  render() {
    return <div>{localStorage.clear()},{this.props.history.push("/")}</div>;
  }
}

export default SignOut;
