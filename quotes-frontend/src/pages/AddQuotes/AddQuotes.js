import React, { useState } from "react";

function AddQuotes() {
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "author") {
      setAuthor(value);
    } else if (name === "quote") {
      setQuote(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform any additional actions with the author and quote here
    // Send them to an API or handle them as needed
    document.getElementById(
      "result"
    ).textContent = `Author: ${author}, Quote: ${quote}`;
    setAuthor("");
    setQuote("");
  };

  return (
    <div>
      <form id="QuoteForm" onSubmit={handleSubmit}>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={handleInputChange}
        />
        <label htmlFor="quote">Quote</label>
        <input
          type="text"
          id="quote"
          name="quote"
          value={quote}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p id="result"></p>
    </div>
  );
}

export default AddQuotes;
