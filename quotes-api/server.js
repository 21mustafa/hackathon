const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

const PORT = 8080;

//Middleware
//-----------------------------
app.use(express.json());
app.use(express.static("public/images"));
app.use(cors());

//Getting quotes

app.get("/", (req, res) => {
  const quotes = JSON.parse(fs.readFileSync("./data/quotes.json"));
  res.send(quotes[Math.floor(Math.random() * quotes.length)]);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
