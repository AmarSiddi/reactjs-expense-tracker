import React, { Component } from "react";
import AppNav from "../Utils/AppNav";

class Home extends Component {
  render() {
    return (
      <div>
        <AppNav />
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          WELOCME TO EXPENSE WEB APPLICATION
        </h2>
      </div>
    );
  }
}

export default Home;
