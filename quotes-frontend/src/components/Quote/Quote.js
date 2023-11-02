import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quote.scss";

function Quote() {
  const [quote, setQuote] = useState(null);
  const [authorName, setAuthorName] = useState(""); // Add this line
  useEffect(() => {
    void getQuote();
  }, []);

  const handleAuthorChange = (event) => {
    setAuthorName(event.target.value);
  };

  const getQuote = async () => {
    try {
      const data = await axios.get("http://localhost:8080");
      setQuote(data.data);
    } catch (e) {
      setQuote({ quote: "Couldn't find a quote." });
    }
  };

  //Find specific quote function

  const findSpecificQuote = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/${authorName}`);
      console.log(data);
      setQuote(data.data);
    } catch (e) {
      setQuote({ quote: "Couldn't find a quote." });
    }
  };

  return (
    <div className="quote">
      {quote ? (
        <>
          <div className="quote__text"> {quote.q}</div>
          <div className="quote__author"> {quote.a}</div>
        </>
      ) : (
        <div className="quote__loading">Finding a new quote...</div>
      )}
      <div className="quote__container">
        <button
          disabled={!quote}
          className="quote__button"
          onClick={() => void getQuote()}
        >
          New Quote
        </button>
        <div className="quote_bottom">
          <input
            className="authorName"
            value={authorName}
            onChange={handleAuthorChange}
            name="authorName"
            placeholder="Search for Author"
          ></input>
          <button onClick={findSpecificQuote} className="quote__button">
            Find
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quote;
