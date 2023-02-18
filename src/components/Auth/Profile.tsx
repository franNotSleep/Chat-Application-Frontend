import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Box, Chip, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

import { ChatState } from "../../Context/ChatProvider";

const Profile = () => {
  const { user, randomQuote } = ChatState();
  const navigate = useNavigate();

  /**
   * @description Make an request to server to logout from the server and after clean localStorage.
   */
  const logOut = async () => {
    axios.get("http://localhost:8080/api/v1/auth/logout");
    localStorage.clear();
    navigate("/");
  };
  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <Stack alignItems={"center"} rowGap={5}>
        <Avatar
          src={user?.avatar}
          alt={`${user?.name}`}
          sx={{ width: 70, height: 70 }}
        />
        <Box sx={{ textAlign: "center", letterSpacing: 2 }}>
          <Typography
            sx={{
              fontSize: "11px",
              color: "#FFFE1E",
              margin: 0,
            }}
          >
            {user?.email}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#FF782D",
              margin: 0,
            }}
          >
            {user?.name}
          </Typography>
        </Box>

        <Box
          sx={{ position: "relative", fontSize: "12px", textAlign: "center" }}
        >
          <Divider textAlign="left">
            <Chip label="About me" color="primary" />
          </Divider>

          {user?.aboutMe ?? `"${randomQuote?.content}"-${randomQuote?.author}`}
          <Divider textAlign="right">
            <Avatar
              src={user?.avatar}
              alt={`${user?.name}`}
              sx={{ width: 30, height: 30 }}
            />
          </Divider>
        </Box>

        <Divider>
          <Chip
            icon={<LogoutIcon />}
            label="Log Out"
            color="error"
            onClick={() => {
              logOut();
            }}
          />
        </Divider>
      </Stack>
    </Box>
  );
};

export default Profile;
