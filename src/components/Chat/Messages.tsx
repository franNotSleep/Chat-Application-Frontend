import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

import { IUser } from '../Group/CreateGroup';
import { IMessage } from './ChatDisplay';

interface IMessagesProps {
  messages: IMessage[];
}

const Messages = (props: IMessagesProps) => {
  const navigate = useNavigate();
  const messageEndRef = React.useRef<HTMLDivElement>(null);

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

  // Scroll on new message
  React.useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [props.messages]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "70vh",
        flexDirection: "column",
      }}
    >
      {props.messages.length === 0 && "Not Message"}
      {props.messages.map((message) => (
        <Message
          sender={message.sender}
          message={message}
          self={currentUser._id === message.sender._id ? true : false}
          key={message._id}
        />
      ))}

      <div ref={messageEndRef} style={{ height: "5px" }} />
    </Box>
  );
};

interface IMessageProps {
  message: IMessage;
  self?: boolean;
  sender: IUser;
}
const Message = (props: IMessageProps) => {
  const date = new Date(props.message.createdAt?.toLocaleString() ?? "");
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "10px",
        margin: 1,
        background: props.self ? "#ebc9bb" : "#99826c",
        alignSelf: props.self ? "flex-end" : "flex-start",
        borderRadius: "50px",
        display: "flex",
      }}
    >
      <Avatar
        sx={{ width: 24, height: 24 }}
        src={props.sender.avatar}
        alt="random skin"
      />

      <Typography>{props.message.content}</Typography>
    </Paper>
  );
};

export default Messages;
