const express = require("express");
const htpp = require("http");
const { Server } = require("socket.io");

//socket io connection setup
const app = express();
const httpServer = htpp.createServer(app);
const io = new Server(httpServer);

// io.on("connection", (socket) => {
//   // ...
// });

app.get("/", (req, res) => res.json({ data: "hello world from socket" }));

app.listen(3001, () => {
  console.log("Server is running");
});
