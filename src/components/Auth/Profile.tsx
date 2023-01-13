import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Card, CardActions, CardContent, IconButton, Modal, Paper, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

import { IUser } from '../Group/CreateGroup';

interface IProfileProps {
  open: boolean;
  handleClose(): void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const Profile = (props: IProfileProps) => {
  const navigate = useNavigate();
  let token!: string;
  let currentUser!: IUser;

  // If not token, go back to the form component
  try {
    if (JSON.parse(localStorage.getItem("user") || "").token) {
      token = JSON.parse(localStorage.getItem("user") || "").token;
      currentUser = JSON.parse(localStorage.getItem("user") || "");
    } else {
      navigate("/");
    }
  } catch (err) {
    navigate("/");
  }
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Paper elevation={2} sx={style}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Avatar>{currentUser.name.slice(0, 2).toUpperCase()}</Avatar>
            <Typography gutterBottom variant="h5" component="div">
              {currentUser.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Tooltip title="Logout">
              <IconButton type="button" sx={{ p: "10px" }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton type="button" sx={{ p: "10px" }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Paper>
    </Modal>
  );
};

export default Profile;
