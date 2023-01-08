import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

interface IChatFormProps {
  onSubmitHandler(e: React.ChangeEvent<HTMLFormElement>): void;
  onChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void;
  content: string;
}

const ChatForm = (props: IChatFormProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <Box
        component="form"
        onSubmit={props.onSubmitHandler}
        sx={{
          display: "flex",
          rowGap: "2",
          margin: 2,
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          label="Message"
        value={props.content}
          onChange={props.onChangeHandler}
        />
        <Button variant="text" type="submit" endIcon={<SendIcon />}>
          Send
        </Button>
      </Box>
    </div>
  );
};

export default ChatForm;
