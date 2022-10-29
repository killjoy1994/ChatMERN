const express = require("express");
const htpp = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = 4000;

//socket io connection setup
const app = express();
app.use(cors());
const httpServer = htpp.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connection is ready");
  socket.on("send-message", (data) => {
    console.log(data);
    socket.emit("message-from-server", data);
  });

  socket.on("disconnect", () => {
    console.log("User left");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

httpServer.listen(PORT, () => {
  console.log("Server is running");
});
