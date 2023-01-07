import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const ChatForm = () => {
  const [message, setMessage] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage) {
      setMessage((prev) => [...prev, newMessage]);
    }

    setNewMessage("");
  };
  return (
    <div>
      <Box
        onSubmit={submitHandler}
        component="form"
        sx={{
          display: "flex",
          rowGap: "2",
          margin: 2,
        }}
      >
        <TextField fullWidth variant="standard" label="Message" />
        <Button variant="text" type="submit" endIcon={<SendIcon />}>
          Send
        </Button>
      </Box>
    </div>
  );
};

export default ChatForm;
