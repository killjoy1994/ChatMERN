const express = require("express");
const app = express();

app.get("/", (req, res) => res.json({ data: "hello world from socket" }));

app.listen(3001, () => {
  console.log("Server is running");
});
