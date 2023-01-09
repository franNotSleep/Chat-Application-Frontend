import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
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
const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
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
        "http://localhost:8080/api/v1/auth/register",
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
      className="app__authForm-register"
      sx={{
        width: 300,
        height: 300,
        display: "flex",
        flexDirection: "column",
        padding: 5,
        rowGap: 2,
      }}
    >
      {!error.success ? <Alert severity="error">{error.error}</Alert> : ""}

      <TextField
        label="Name"
        variant="standard"
        name="name"
        value={input.name}
        onChange={changeHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          ),
        }}
      />
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
        variant="standard"
        type="password"
        name="password"
        value={input.password}
        onChange={changeHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <Fab type="submit" variant="extended">
        <AppRegistrationIcon sx={{ mr: 2 }} />
        Sign Up
      </Fab>
    </Box>
  );
};

export default Register;
