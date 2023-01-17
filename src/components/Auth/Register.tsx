import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Button, InputAdornment } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
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
    <Box method="post" onSubmit={submitHandler} component="form" sx={{ mt: 1 }}>
      {!error.success ? <Alert severity="error">{error.error}</Alert> : ""}

      <TextField
        margin="normal"
        label="Name"
        variant="standard"
        name="name"
        fullWidth
        required
        value={input.name}
        onChange={changeHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        label="Email"
        variant="standard"
        name="email"
        required
        fullWidth
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
        margin="normal"
        label="Password"
        variant="standard"
        type="password"
        required
        fullWidth
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
};

export default Register;
