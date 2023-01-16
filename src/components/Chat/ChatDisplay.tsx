import { Box, Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';

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
  sender: string;
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
        sender: currentUser._id,
        content: "",
      });
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage({
      sender: currentUser._id,
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
    console.log(props.selectedGroup);
  }, [props.selectedGroup]);

  return (
    <Box
      sx={{
        padding: "2rem",
        width: 8 / 10,
        height: "80vh",
        background: "#fff",
        border: "1px solid black",
      }}
    >
      <Box
        sx={{
          height: "70vh",
          margin: "0 auto",
          width: 1 / 1,
        }}
      >
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
        <Divider />
        <Messages messages={message} />
      </Box>

      {props.selectedGroup ? (
        <ChatForm
          onSubmitHandler={submitHandler}
          onChangeHandler={changeHandler}
          content={newMessage ? newMessage.content : ""}
        />
      ) : (
        <Typography variant="h4" component="h2">
          Join Or Create Group
        </Typography>
      )}
    </Box>
  );
};

export default ChatDisplay;
