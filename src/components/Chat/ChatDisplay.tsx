import { Box, Button, Divider, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';

import chatAnimation from '../../assets/chatAnimation.json';
import { IUser } from '../Group/CreateGroup';
import ChatForm from './ChatForm';
import Messages from './Messages';

// Connect to socket
const socket = io("http://localhost:8080");

export interface IGroup {
  _id: string;
  name: string;
  admin: {
    name: string;
    _id: string;
  };
  participants: IUser[];
  createdAt?: Date | string;
}

export interface IGroupResponse {
  group: IGroup[];
}

export interface IMessage {
  _id?: string;
  sender: IUser;
  content: string;
  group?: string;
  createdAt?: Date | string;
}

interface IChatDisplayProps {
  selectedGroup: IGroup | undefined;
  cleanGroup: () => void;
}

const ChatDisplay = (props: IChatDisplayProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<IMessage>();

  // Get token
  // if not token, return to home page
  // if not find user, return to home page
  let token!: string;
  let currentUser!: IUser;
  try {
    token = JSON.parse(localStorage.getItem("user") || "").token;
    currentUser = JSON.parse(localStorage.getItem("user") || "");
  } catch (err) {
    navigate("/");
  }

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post<IMessage>(
        `http://localhost:8080/api/v1/message/${props.selectedGroup?._id}/message`,
        newMessage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Emit message to the server
      // socket.emit("send-message", data);
      setMessage([...message, data]);
      setNewMessage({
        sender: currentUser,
        content: "",
      });
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage({
      sender: currentUser,
      content: e.target.value,
      group: props.selectedGroup?._id,
    });
  };

  // Leave group
  const leaveGroup = async () => {
    try {
      // leaving group
      if (currentUser._id === props.selectedGroup?.admin._id) {
        // send an alert
        return;
      }
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/group/${props.selectedGroup?._id}/leave`,
        { userId: currentUser._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      props.cleanGroup();
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  // Get all message related to selected group
  const getMessage = async () => {
    const { data } = await axios.get<IMessage[]>(
      `http://localhost:8080/api/v1/message/${props.selectedGroup?._id}/message`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMessage(data);
  };

  useEffect(() => {
    // Get message related to the group
    getMessage();
  }, [props.selectedGroup]);

  return (
    <Box
      sx={{
        padding: "2rem",
        background: "#70C3FF",
        border: "2px solid green",
        height: 1 / 1,
      }}
    >
      {/* Chat Start */}
      <Box
        sx={{
          height: "70vh",
          margin: "0 auto",
          width: 1 / 1,
          position: "relative",
          border: "2px solid red",
        }}
      >
        {/* if not group selected */}
        {!props.selectedGroup && (
          <Paper
            elevation={6}
            sx={{
              width: 1 / 2,
              height: 1 / 2,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              background:
                "rgb(112,195,255) radial-gradient(circle, rgba(112,195,255,1) 30%, rgba(109,27,123,1) 97%)",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <Lottie
              animationData={chatAnimation}
              loop={true}
              style={{
                width: "70px",
                height: "100px",
                margin: "0 auto",
              }}
            />
            No Group Selected
          </Paper>
        )}

        {/* If there is a group */}
        {props.selectedGroup && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            {/* Group name */}
            <Typography variant="h4" component="h2">
              {props.selectedGroup?.name}
            </Typography>
            <Divider orientation="vertical" />
            {/* Leave group button */}
            <Button
              variant="contained"
              color="error"
              onClick={() => leaveGroup()}
            >
              Leave Group
            </Button>
          </Box>
        )}
        {props.selectedGroup && <Messages messages={message} />}
      </Box>
      {/* Chat End */}

      {props.selectedGroup && (
        <ChatForm
          onSubmitHandler={submitHandler}
          onChangeHandler={changeHandler}
          content={newMessage ? newMessage.content : ""}
        />
      )}
    </Box>
  );
};

export default ChatDisplay;
