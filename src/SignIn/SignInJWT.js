import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
//import Box from '@material-ui/core/Box';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      usernameOrEmail: null,
      password: null,
      login: false,
      store: null
    };
  }

  // componentDidMount()
  // {
  //   this.storeCollector()
  // }
  
  // storeCollector()
  // {
  //   let store=JSON.parse(localStorage.getItem('login'));
  //   if(store&&store.login){
  //     this.setState({login:true, store:store})
  //   }
  // }

  login() {
    fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(this.state)
    }).then(response => {
      response.json().then(result => {
        console.warn("result", result);
        localStorage.setItem( "login", JSON.stringify({
            login: true,
            store: result.accessToken
          })
        );
        this.setState({ login: true });
        //this.storeCollector()
      });
    });
  }

  post(){

    // let accessToken = "Bearer "+this.state.accessToken
    // fetch("http://localhost:5000/post", {
    //   method: "POST",
    //   headers: new Headers({
    //     "Athorization": accessToken,
    //     "Content-Type": "application/json"
    //   }),
    //   body: JSON.stringify(this.state.post)
    // }).then(response => {
    //   response.json().then(result => {
    //     console.warn("result", result);
    //   })
    // })
  }

  render() {
    return (
      <div>
        <h1>Test Login Page</h1>
        {!this.state.login ?
          <div>
            <input
              type="text"
              onChange={event => {
                this.setState({ usernameOrEmail: event.target.value });
              }}
            />
            <br />
            <br />
            <input
              type="password"
              onChange={event => {
                this.setState({ password: event.target.value });
              }}
            />
            <br />
            <br />
            <button
              type="submit"
              onClick={() => {
                this.login();
              }}
            >
              Submit
            </button>
          </div>
        :
          <div>
            <textarea
              onChange={event => this.setState({ pos: event.this.value })}
            ></textarea>
            <button
              onClick={() => {
                this.post();
              }}
            >
              Post
            </button>
          </div>
        }
      </div>
    );
  }
}

export default SignIn;
