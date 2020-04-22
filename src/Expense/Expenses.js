import React, { Component } from "react";
import AppNav from "../Utils/AppNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import {
  Container,
  Button,
  Input,
  Label,
  Form,
  FormGroup,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class Expenses extends Component {
  emptyItem = {
    description: "",
    expenseDate: new Date(),
    location: "",
    category: { id: '1',name:'test1'},
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      date: new Date(),
      Expenses: [],
      item: this.emptyItem,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const item = this.state.item;
    console.log(item);

    await fetch(process.env.REACT_APP_HOST_URL + "/api/expenses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("store"),
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/home");
    this.props.history.push("/expenses");
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });

    console.log(item);
  }

  handleCatChange(category) {

    const target = category.target;
    const value = target.value;

    let idx = category.target.selectedIndex;
    let dataset = category.target.options[idx].text;

    category = {...this.state.category}
    category.id = value;
    category.name = dataset;

    let item = { ...this.state.item};
    item.category = category
    this.setState({ item });
  }

  handleDateChange(date) {
    let item = { ...this.state.item };
    item.expenseDate = date;
    this.setState({ item });
  }

  async remove(id) {
    await fetch(process.env.REACT_APP_HOST_URL + "/api/expenses/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("store"),
      },
    }).then(() => {
      let updatedExpenses = [...this.state.Expenses].filter((i) => i.id !== id);
      this.setState({ Expenses: updatedExpenses });
    });
  }

  async componentDidMount() {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("store"),
    };
    const response = await fetch(
      process.env.REACT_APP_HOST_URL + "/api/categories",
      {
        headers,
      }
    );
    const body = await response.json();
    this.setState({ Categories: body, isLoading: false });

    const responseExp = await fetch(
      process.env.REACT_APP_HOST_URL + "/api/expenses",
      {
        headers,
      }
    );
    const bodyExp = await responseExp.json();
    this.setState({ Expenses: bodyExp, isLoading: false });
  }

  render() {
    const title = <h3>Add Expense</h3>;
    const { Categories } = this.state;
    const { Expenses, isLoading } = this.state;

    if (isLoading) return <div>Loading....</div>;

    let optionList = Categories.map((category) => (
      <option
        name={category.id}
        value={category.id}
        key={category.id}
      >
        {category.name}
      </option>
    ));

    let rows = Expenses.map((expense) => (
      <tr key={expense.id}>
        <td>{expense.description}</td>
        <td>{expense.location}</td>
        <td>
          <Moment date={expense.expenseDate} format="YYYY/MM/DD" />
        </td>
        <td>{expense.categoryName}</td>
        <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.remove(expense.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <AppNav />
        <Container>
          {title}
          {this.cat}
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="description">Title</Label>
                <Input
                  type="description"
                  name="description"
                  id="description"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="category">Category</Label>
                <div>
                  <select className="col-md-6" category={this.state.category} onChange={this.handleCatChange}>
                    {optionList}
                  </select>
                </div>
              </FormGroup>
            </div>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="expenseDate">Date</Label>
                <div>
                  <DatePicker
                    selected={this.state.item.expenseDate}
                    onChange={this.handleDateChange}
                  />
                </div>
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>

            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>{" "}
        <Container>
          <h3>Expenses List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Description</th>
                <th width="10%">Location</th>
                <th>Date</th>
                <th>Category</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
        }
      </div>
    );
  }
}

export default Expenses;
