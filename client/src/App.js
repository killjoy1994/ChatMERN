import { io } from "socket.io-client";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      console.log("message received from server", data);
    });
  }, [socket]);

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("send-message", { message });
    setMessage("");
  };
  return (
    <div>
      <Box component="form" onSubmit={submitHandler}>
        <TextField
          size="small"
          label="Write your message"
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="text">
          Send
        </Button>
      </Box>
    </div>
  );
}

export default App;
