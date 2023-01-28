import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputBase, Paper } from '@mui/material';
import React, { useState } from 'react';

interface IChatFormProps {
  onSubmitHandler(e: React.ChangeEvent<HTMLFormElement>): void;
  onChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void;
  content: string;
}

const ChatForm = (props: IChatFormProps) => {
  return (
    <Paper
      elevation={2}
      variant="outlined"
      component="form"
      onSubmit={props.onSubmitHandler}
      sx={{
        p: "0.5rem",
        display: "flex",
        width: 1 / 1,
      }}
    >
      <InputBase
        fullWidth
        placeholder="Send Message"
        value={props.content}
        onChange={props.onChangeHandler}
      />
      <IconButton type="submit">
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatForm;
