import { Box } from '@mui/material';
import React from 'react';

import { IMessage } from './ChatDisplay';

interface IMessagesProps {
  messages: IMessage[];
}

const Messages = (props: IMessagesProps) => {
  return (
    <>
      {props.messages.map((message) => (
        <Message content={message.content} key={message._id} />
      ))}
    </>
  );
};

interface IMessageProps {
  content: string;
}
const Message = (props: IMessageProps) => (
  <Box
    sx={{
      width: "max-content",
      height: 20,
      backgroundColor: "primary.dark",
      "&:hover": {
        backgroundColor: "primary.main",
        opacity: [0.9, 0.8, 0.7],
      },
    }}
  >
    {props.content}
  </Box>
);

export default Messages;
