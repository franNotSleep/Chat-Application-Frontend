import { Box } from '@mui/material';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';;
import { IUser } from '../Group/CreateGroup';


export interface IGroupResponse {
  group: {
    _id: string;
    name: string;
    admin: {
      name: string;
      _id: string;
    },
    participants: IUser[];
  }
}

const ChatDisplay = () => {
  const navigate = useNavigate();

  // Get token
  // if not token, return to home page
  let token!: string;
  try {
    token = JSON.parse(localStorage.getItem("user") || '').token;
  } catch (err) {
    console.log(err);
  }
  // Get group
  const getSelectedGroup = async () => {
    const { data } = await axios.get<IGroupResponse>('http://localhost:8080/api/v1/group?search=', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

    console.log(data.group);
  };

  getSelectedGroup();

  return (
    <Box
      sx={{
        height: "70vh",
        margin: "0 auto",
        width: 1 / 1,
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "max-content",
          height: 20,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        Hola
      </Box>
      <Box
        sx={{
          width: "max-content",

          height: 20,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
          alignItems: "flex-end",
          position: "absolute",
          right: "0px",
        }}
      >
        Hola
      </Box>
    </Box>
  );
};

export default ChatDisplay;
