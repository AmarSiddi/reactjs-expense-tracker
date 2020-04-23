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

const initState={
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errorMessage: "",
  nameError:"",
  emailError:"",
  passwordError:"",
  confirmPasswordError:""
 }

class SignUp extends Component {

  state = initState;

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
    
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError="";

    if (!this.state.userName) {
      nameError = "username can't be blank";
    }else if(this.state.userName.length<5){
      nameError = "invalid username";
    }

    if (!(this.state.email) ) {
      emailError = "email can't be blank";
    }else if(!(this.state.email.includes("@"))){
      emailError = "invalid email";
    }

    if(!(this.state.password)){
      passwordError="password can't be empty";
    }else if(this.state.password.length<5){
      passwordError="invalid password";
    }

    if(!(this.state.confirmPassword)){
      confirmPasswordError="confirm password can't be empty";
    }else if(this.state.confirmPassword.length<5){
      confirmPasswordError="invalid password";
    }

    if(this.state.password !== this.state.confirmPassword){
      this.setState({errorMessage : "password and confirm password doesn't match!!"})
    }
    
    if (emailError||nameError||passwordError||confirmPasswordError) {
      this.setState({ emailError,nameError,passwordError,confirmPasswordError});
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { password, confirmPassword } = this.state;

    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
     

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
     // clear form
     this.setState({initState});
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
                  name="userName"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  onChange={this.handleChange}
                  helperText="*username should be minimum 5 character"
                />
              </Grid>
              <div style={{fontSize:12, color:"red"}}>{this.state.nameError}</div>
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
              <div style={{fontSize:12, color:"red"}}>{this.state.emailError}</div>
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
                  helperText="*password should be minimum 5 character long"
                />
              </Grid>
              <div style={{fontSize:12, color:"red"}}>{this.state.passwordError}</div>
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
              <div style={{fontSize:12, color:"red"}}>{this.state.confirmPasswordError}</div>
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
          <h4 style={{color:"red"}}>{this.state.errorMessage}</h4>
        </div>
      </Container>
    );
  }
}

export default SignUp;
