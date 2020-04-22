import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./SignUp.css";

class SignUp extends Component {
  state = {
    userName: "",
    //lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    errorMessage: "",
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      const url = process.env.REACT_APP_HOST_URL+"/api/auth/signup";
      const bodyData = {
        //name: this.state.firstName + "" + this.state.lastName,
        name: this.state.userName,
        username: this.state.userName,
        email: this.state.email,
        password: this.state.password,
      };

      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData), // data can be `string` or {object}!
      })
        .then(async (response) => {
          const data = await response.json();

          console.log("status code :", data.status);
          console.log("message :", data.message);
          console.log("success status :", data.success);

          if (
            data.status === 200 ||
            data.status === 201 ||
            data.success === true
          ) {
            console.log("SUCCESS!!");
            //localStorage.setItem("login", true);
            this.setState({
              errorMessage: data.message,
            });
            this.setState({
              errorMessage: "User registered successfully!!!!!",
            });
          } else if (data.status === 400) {
            this.setState({
              errorMessage: "Please enter valid details!",
            });
          } else if (data.message === "Username is already taken!") {
            this.setState({
              errorMessage: data.message,
            });
          } else if (data.message === "Email Address already in use!") {
            this.setState({
              errorMessage: data.message,
            });
          }
        })
        .catch((error) => {
          this.setState({
            errorMessage: "Something went wrong, Please try again!.",
          });
          //console.error('There was an error!', error);
        });
    }
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className="form" noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Uname"
                  name="UserName"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  onChange={this.handleChange}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={this.handleChange}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-confirmPassword"
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
          <h4 className="errorMessage">{this.state.errorMessage}</h4>
        </div>
      </Container>
    );
  }
}

export default SignUp;
