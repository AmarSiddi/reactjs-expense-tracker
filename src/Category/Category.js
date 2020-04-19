import React, { Component } from "react";
import AppNav from "../Utils/AppNav";

class Category extends Component {
  state = {
    isLoading: true,
    Categories: [],
  };

  async componentDidMount() {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("store"),
    };
    await fetch("/api/categories/", {
      headers,
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        this.setState({ Categories: data, isLoading: false });
        console.log("Category!!!!!");
      })
      .catch((error) => {
        this.setState({ errorMessage: error });
        console.error("There was an error!", error);
      });
  }

  render() {
    const { Categories, isLoading } = this.state;
    if (isLoading) return <div>Loading...</div>;

    return (
      <div>
        <AppNav />
        <h4>Categories</h4>
        {Categories.map((category) => (
          <div id={category.id}>{category.name}</div>
        ))}
      </div>
    );
  }
}

export default Category;
