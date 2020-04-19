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

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      usernameOrEmail: "",
      password: "",
      login: false,
      store: null,
      errorMessage: "",
    };
  }

  componentDidMount() {
    this.storeCollector();
  }

  storeCollector() {
    try {
      let store = JSON.parse(localStorage.getItem("login"));
      if (store && store.login) {
        this.setState({ login: true, store: store });
      }
    } catch (err) {
      localStorage.clear();
      this.storeCollector();
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const url = "/api/auth/signin";
    const data1 = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password,
    };

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data1), // data can be `string` or {object}!
    })
      .then(async (response) => {
        const data = await response.json();

        console.log("status code :", response.status);

        if (
          response.status &&
          data.accessToken &&
          data.accessToken != null &&
          response.status === 200
        ) {
          console.log("SUCCESS!!");

          localStorage.setItem("login", true);
          localStorage.setItem("store", data.accessToken);

          this.props.history.push("/home");
        } else {
          if (response.status === "401") {
            this.setState({
              errorMessage: "Please enter valid username or password.",
            });
          }
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: "Something went wrong, Please try again!",
        });
        //console.error('There was an error!', error);
      });
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          {
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
          }
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form" onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="usernameOrEmail"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item container justify="flex-end">
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <h3 className="errorMessage">{this.state.errorMessage}</h3>
        </div>
      </Container>
    );
  }
}

export default SignIn;
