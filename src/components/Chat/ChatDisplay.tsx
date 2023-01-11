import { Box, Typography } from '@mui/material';
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
}

export interface IGroupResponse {
  group: IGroup[];
}

export interface IMessage {
  _id?: string;
  sender: string;
  content: string;
  group?: string;
}

interface IChatDisplayProps {
  selectedGroup: IGroup | undefined;
}

const ChatDisplay = (props: IChatDisplayProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<IMessage>();

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
    // Join Room
    // socket.emit("join-room", props.selectedGroup?._id);
    // Get message related to the group
    getMessage();
    console.log(props.selectedGroup);
  }, [props.selectedGroup]);

  // useEffect(() => {
  //   socket.on("chat", (msg: IMessage) => {
  //     if (props.selectedGroup?._id) {
  //       if (msg.group === props.selectedGroup?._id) {
  //         setMessage([...message, msg]);
  //       }
  //     }
  //   });
  // });

  return (
    <Box
      sx={{
        padding: "2rem",
        width: 8 / 10,
        height: "80vh",
        background: "#fff",
      }}
    >
      <Box
        sx={{
          height: "70vh",
          margin: "0 auto",
          width: 1 / 1,
          position: "relative",
        }}
      >
        <Typography variant="h4" component="h2">
          {props.selectedGroup?.name}
        </Typography>
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
