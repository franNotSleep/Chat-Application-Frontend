import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { IUser } from '../Group/CreateGroup';

interface IProfileProps {
  open: boolean;
  handleClose(): void;
}

interface IEditResponse {
  success: true;
  user: IUser;
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
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const logoutHandler = async () => {
    // remove token from cookies
    try {
      await axios.get("http://localhost:8080/api/v1/auth/logout");

      // removing user from the localstorage
      localStorage.clear();

      // go back to home page
      navigate("/");
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const editHandler = async () => {
    const {
      data: { user, success },
    } = await axios.put<IEditResponse>(
      "http://localhost:8080/api/v1/auth/uptdetails",
      {
        name: input.name,
        email: input.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let userToken = { ...user, token };

    setInput({ name: user.name, email: user.email });
    localStorage.setItem("user", JSON.stringify(userToken));
    setEditing(false);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // [e.target.name]: e.target.value == {<nameAttribute>: <value>}
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Paper elevation={2} sx={style}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            {/* Return the first to letter of the current user name */}
            <Avatar src={currentUser.avatar} />
            {/* If editing is true, transform the label to inputs */}
            {!editing ? (
              <Typography gutterBottom variant="h5" component="div">
                {input.name}
              </Typography>
            ) : (
              <TextField
                value={input.name}
                name="name"
                onChange={changeHandler}
              />
            )}
            {!editing ? (
              <Typography variant="body2" color="text.secondary">
                {input.email}
              </Typography>
            ) : (
              <>
                <TextField
                  value={input.email}
                  name="email"
                  onChange={changeHandler}
                />
                <Tooltip title="Confirm">
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    onClick={editHandler}
                  >
                    <SendIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </CardContent>
          <CardActions>
            <Tooltip title="Logout">
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                onClick={logoutHandler}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                onClick={() => {
                  setEditing(!editing);
                }}
              >
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
