import React, { useEffect, useState } from "react";

function Quote() {
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    // axios.get()
  }, []);
  return (
    <div className="quote">
      {/* <div className="quote__display"> {props.quote}</div> */}
    </div>
  );
}

export default Quote;
