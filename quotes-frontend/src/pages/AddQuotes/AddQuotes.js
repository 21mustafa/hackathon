import React, { Component } from "react";

class AddQuotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      quote: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { author, quote } = this.state;
    // You can perform any additional actions with the author and quote here
    // Send them to an API or handle them as needed
    document.getElementById(
      "result"
    ).textContent = `Author: ${author}, Quote: ${quote}`;
    this.setState({ author: "", quote: "" });
  };

  render() {
    return (
      <div>
        <form id="QuoteForm" onSubmit={this.handleSubmit}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={this.state.author}
            onChange={this.handleInputChange}
          />
          <label htmlFor="quote">Quote</label>
          <input
            type="text"
            id="quote"
            name="quote"
            value={this.state.quote}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <p id="result"></p>
      </div>
    );
  }
}

export default AddQuotes;
