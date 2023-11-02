import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quote.scss";

function Quote() {
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    void getQuote();
  }, []);

  const getQuote = async () => {
    try {
      const data = await axios.get("http://localhost:8080/");
      setQuote(data);
    } catch (e) {
      setQuote({ quote: "Couldn't find a quote." });
    }
  };

  return (
    <div className="quote">
      {quote ? (
        <>
          <div className="quote__text"> {quote.quote}</div>
          <div className="quote__author"> {quote.author}</div>
        </>
      ) : (
        <div className="quote__loading">Finding a new quote...</div>
      )}
      <button
        disabled={!quote}
        className="quote__button"
        onClick={() => void getQuote()}
      >
        New Quote
      </button>
    </div>
  );
}

export default Quote;
