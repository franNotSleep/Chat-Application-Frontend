import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { IUser } from '../Group/CreateGroup';
import ChatForm from './ChatForm';

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

interface IMessage {
  _id?: string;
  sender: string;
  content: string;
  group?: string;
}

const ChatDisplay = () => {
  const navigate = useNavigate();
  const [group, setGroup] = useState<IGroup>();
  const [message, setMessage] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<IMessage>();

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create new message and assign it to message state
    try {
      const newMsg = await axios.post(
        `http://localhost:8080/api/v1/message/${group?._id}/message`,
        newMessage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewMessage({
        sender: currentUser._id,
        content: "",
      });
      console.log(newMsg);
    } catch (err: any) {
      console.log(group);
      console.log(err.response.data);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage({
      sender: currentUser._id,
      content: e.target.value,
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
  // Get group
  const getSelectedGroup = async () => {
    const { data } = await axios.get<IGroupResponse>(
      "http://localhost:8080/api/v1/group?search=",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setGroup(data.group[0]);
  };

  useEffect(() => {
    getSelectedGroup();
  }, []);

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
          {group?.name}
        </Typography>
        <Message content="Francisco" />
      </Box>
      <ChatForm
        onSubmitHandler={submitHandler}
        onChangeHandler={changeHandler}
        content={newMessage ? newMessage.content : ""}
      />
    </Box>
  );
};

interface IMessageProps {
  content: string;
}

const Message = (props: IMessageProps) => {
  return (
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
      {props.content}
    </Box>
  );
};

export default ChatDisplay;
