import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

class AppNav extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/home">Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/categories">Categories</Nav.Link>
              <Nav.Link href="/expenses">Expenses</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link eventKey={2} href="/sigout">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNav;
