import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
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
    console.log(input);
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
        mt: 1,
      }}
    >
      {!error.success ? <Alert severity="error">{error.error}</Alert> : ""}
      <TextField
        margin="normal"
        label="Email"
        variant="outlined"
        name="email"
        required
        value={input.email}
        fullWidth
        onChange={changeHandler}
      />
      <TextField
        fullWidth
        margin="normal"
        required
        label="Password"
        onChange={changeHandler}
        value={input.password}
        name="password"
        variant="outlined"
        type="password"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, borderRadius: "20px" }}
        endIcon={<PublicRoundedIcon color="action" />}
      >
        Log In
      </Button>
    </Box>
  );
};

export default Login;
