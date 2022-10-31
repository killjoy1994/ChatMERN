import { io } from "socket.io-client";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      console.log("message received from server", data);
      setChat((prevState) => {
        return [...prevState, data.message];
      });
    });
  }, [socket]);

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("send-message", { message });
    setMessage("");
  };
  return (
    <div>
      <Container>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((message) => {
            return <Typography key={message}>{message}</Typography>;
          })}
        </Box>
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
      </Container>
    </div>
  );
}

export default App;
