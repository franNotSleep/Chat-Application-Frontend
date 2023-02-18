import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";

import { ChatState, IUser } from "../../Context/ChatProvider";
import { IMessage } from "./ChatDisplay";

interface IMessagesProps {
  messages: IMessage[];
}

const Messages = (props: IMessagesProps) => {
  const { user } = ChatState();
  const messageEndRef = React.useRef<HTMLDivElement>(null);

  // Scroll on new message
  React.useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [props.messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        justifyContent: "flex-end",
        // height: "200px",
        height: { xs: "80%", md: "75%" },
        overflowY: "scroll",
        border: "1px solid blue",
      }}
    >
      <Scrollbars
        style={{
          height: "100%",
          // display: "flex",
          // flexDirection: "column",
          // padding: "10px",
          // justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            justifyContent: "flex-end",
          }}
        >
          {props.messages.length === 0 && "Not Message"}
          {props.messages.map((message) => (
            <Message
              sender={message.sender}
              message={message}
              self={user?._id === message.sender._id ? true : false}
              key={message._id}
            />
          ))}
        </Box>
        <div ref={messageEndRef} style={{ height: "5px" }} />
      </Scrollbars>
    </Box>
  );
};

interface IMessageProps {
  message: IMessage;
  self?: boolean;
  sender: IUser;
}
const Message = (props: IMessageProps) => {
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
        width: "max-content",
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
