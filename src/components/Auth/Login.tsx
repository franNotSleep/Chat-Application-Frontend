import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import { InputAdornment } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type GetToken = {
  token: string;
};

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    success: true,
    error: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // [e.target.name]: e.target.value == {<nameAttribute>: <value>}
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<GetToken>(
        "http://localhost:8080/api/v1/auth/login",
        input
      );

      setError({ ...error, success: true });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/chat");
    } catch (err: any) {
      setError(err.response.data);
    }
  };
  return (
    <Box
      method="post"
      onSubmit={submitHandler}
      component="form"
      sx={{
        width: 300,
        height: 300,
        display: "flex",
        flexDirection: "column",
        padding: 5,
        rowGap: 4,
      }}
    >
      {!error.success ? <Alert severity="error">{error.error}</Alert> : ""}
      <TextField
        label="Email"
        variant="standard"
        name="email"
        value={input.email}
        onChange={changeHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Password"
        onChange={changeHandler}
        value={input.password}
        name="password"
        variant="standard"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <Fab variant="extended" type="submit">
        <LoginIcon sx={{ mr: 2 }} />
        Login
      </Fab>
    </Box>
  );
};

export default Login;
