import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputBase, Paper } from '@mui/material';
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
    <Paper
      elevation={2}
      variant="outlined"
      component="form"
      onSubmit={props.onSubmitHandler}
      sx={{ p: "0.5rem", display: "flex", alignItems: "center" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        fullWidth
        inputProps={{ "aria-label": "Send Message" }}
        placeholder="Send Message"
        value={props.content}
        onChange={props.onChangeHandler}
      />
      <IconButton type="submit" sx={{ p: "10px" }}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatForm;
