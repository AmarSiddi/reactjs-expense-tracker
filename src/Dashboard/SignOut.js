import React, { Component } from "react";

class SignOut extends Component {
  state = {};
  render() {
    return (
      <div>
        {localStorage.clear()},{this.props.history.push("/")}
      </div>
    );
  }
}

export default SignOut;
