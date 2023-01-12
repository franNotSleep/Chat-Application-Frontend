import { Box, Paper } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

import { IUser } from '../Group/CreateGroup';
import { IMessage } from './ChatDisplay';

interface IMessagesProps {
  messages: IMessage[];
}

const Messages = (props: IMessagesProps) => {
  const navigate = useNavigate();
  let currentUser: IUser;

  // If not token, go back to the form component
  try {
    if (JSON.parse(localStorage.getItem("user") || "")) {
      currentUser = JSON.parse(localStorage.getItem("user") || "");
    } else {
      navigate("/");
    }
  } catch (err) {
    navigate("/");
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {props.messages.map((message) => (
        <Message
          message={message}
          self={currentUser._id === message.sender ? true : false}
          key={message._id}
        />
      ))}
    </Box>
  );
};

interface IMessageProps {
  message: IMessage;
  self?: boolean;
}
const Message = (props: IMessageProps) => (
  <Paper
    elevation={3}
    sx={{
      width: "max-content",
      height: 20,
      padding: "0.5rem",
      margin: 1,
      background: props.self ? "#ebc9bb" : "#99826c",
      alignSelf: props.self ? "flex-end" : "flex-start",
    }}
  >
    {props.message.content}
  </Paper>
);

export default Messages;
