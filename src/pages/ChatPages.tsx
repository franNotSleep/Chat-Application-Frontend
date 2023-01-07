import './style.css';

import { Box } from '@mui/material';
import Container from '@mui/material/Container/Container';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatDisplay from '../components/Chat/ChatDisplay';
import ChatForm from '../components/Chat/ChatForm';
import GroupNav from '../components/Group/GroupNav';

const ChatPages = () => {
  const [message, setMessage] = useState<string[]>([""]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // const socket = io("http://localhost:8080");

  useEffect(() => {
    if (typeof localStorage.getItem("user") !== "string") {
      navigate("/");
    }
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const clickHandler = () => {
    // socket.emit("hola", `${user.name}: ${msg}`);
    setMessage([...message, msg]);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          background: "#2cf",
        }}
      >
        <GroupNav />
      </Box>
      <Box
        sx={{
          padding: "2rem",
          width: 8 / 10,
          height: "80vh",
          background: "#fff",
        }}
      >
        <ChatDisplay />
        <ChatForm />
      </Box>
    </Container>
  );
};

export default ChatPages;
