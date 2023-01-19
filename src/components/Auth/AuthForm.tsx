import './style.css';

import { Box, CssBaseline, Grid, Link, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import earthRotate from '../../assets/earthRotate.json';
import AuthNavBar from './AuthNavBar';
import Login from './Login';
import Register from './Register';

const theme = createTheme({
  palette: {
    primary: {
      main: "#70C3FF",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const AuthForm = () => {
  // if user exist redirect to /chat route
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof localStorage.getItem("user") === "string") {
      navigate("/chat");
    }
  });

  const [val, setVal] = useState(0);

  const setNewVal = (index: number) => {
    setVal(index);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            background: "#70C3FF",
          }}
        >
          <Lottie
            animationData={earthRotate}
            loop={true}
            style={{ height: "600px" }}
            className="lottie-md"
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Lottie
              animationData={earthRotate}
              loop={true}
              style={{ height: "73px", width: "73px" }}
              className="lottie-sm"
            />
            <AuthNavBar setNewVal={setNewVal} />
            {val ? <Login /> : <Register />}
            <Typography variant="body2" color="text.secondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="http://localhost:5173/">
                Charap
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default AuthForm;
