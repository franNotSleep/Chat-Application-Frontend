import { Box, CssBaseline } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';

import { IUser } from '../Group/CreateGroup';
import ChatForm from './ChatForm';
import ChatHeader from './ChatHeader';
import ChatLobbie from './ChatLobbie';
import Messages from './Messages';

// Connect to socket
const socket = io("http://localhost:8080");
let selectedChatCompare: string | undefined = "";

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

      socket.emit(
        "new message",
        newMessage && {
          content: newMessage,
          to: newMessage.group,
        }
      );
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
    socket.emit("join group", props.selectedGroup?._id);
    setMessage(data);
  };

  useEffect(() => {
    // Get message related to the group
    getMessage();
    selectedChatCompare = props.selectedGroup?._id;
  }, [props.selectedGroup]);

  useEffect(() => {
    socket.on("message received", (content: IMessage) => {
      console.log(selectedChatCompare);

      if (!selectedChatCompare || content.group !== selectedChatCompare) {
        console.log("ping");
      } else if (selectedChatCompare === content.group) {
        setMessage([...message, content]);
      }
    });
  });

  return (
    <Box
      sx={{
        background: "#70C3FF",
        height: 1 / 1,
        display: "flex",
        flexWrap: "wrap",
        width: 1 / 1,
        alignContent: "space-between",
      }}
    >
      <CssBaseline />
      {/* Chat Header start */}
      {props.selectedGroup && (
        <ChatHeader
          groupName={props.selectedGroup.name}
          leaveGroup={leaveGroup}
        />
      )}
      {/* Chat Header end */}
      {/* ======================== */}
      {/* Chat Start */}
      <Box
        sx={{
          width: 1 / 1,
          height: "70vh",
          position: "relative",
          overflowY: "scroll",
        }}
      >
        {/* if not group selected */}
        {!props.selectedGroup && <ChatLobbie />}
        {props.selectedGroup && <Messages messages={message} />}
      </Box>
      {/* Chat End */}
      {/* ======================== */}
      {/* Chat footer start */}
      {props.selectedGroup && (
        <ChatForm
          onSubmitHandler={submitHandler}
          onChangeHandler={changeHandler}
          content={newMessage ? newMessage.content : ""}
        />
      )}
      {/* Chat footer end */}
    </Box>
  );
};

export default ChatDisplay;
