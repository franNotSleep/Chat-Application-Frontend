import './style.css';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import images from '../../constants/images';
import AuthNavBar from './AuthNavBar';
import Login from './Login';
import Register from './Register';

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
    <Container
      maxWidth="md"
      className="app__authForm"
      sx={{
        background: "#fff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        borderRadius: "20",
      }}
    >
      <div className="app__authForm-img">
        <img src={images.saly10} alt="Boy in a computer" />
      </div>
      <Box>
        <AuthNavBar setNewVal={setNewVal} />
        {val ? <Login /> : <Register />}
      </Box>
    </Container>
  );
};

export default AuthForm;
