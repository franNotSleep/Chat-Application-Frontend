import { Box, CssBaseline, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { ChatState, IUser } from "../../Context/ChatProvider";
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import ChatLobbie from "./ChatLobbie";
import Messages from "./Messages";

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
  cleanGroup: () => void;
}
/**
 *
 * @Nota Make a layout in a way that the navbar stay in the top, message in the middle and the form in the bottom
 */
const ChatDisplay = (props: IChatDisplayProps) => {
  const [message, setMessage] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<IMessage>();

  const { user, selectedGroup } = ChatState();

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post<IMessage>(
        `http://localhost:8080/api/v1/message/${selectedGroup?._id}/message`,
        newMessage,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
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
      user &&
        setNewMessage({
          sender: user,
          content: "",
        });
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    user &&
      setNewMessage({
        sender: user,
        content: e.target.value,
        group: selectedGroup?._id,
      });
  };

  // Leave group
  const leaveGroup = async () => {
    try {
      // leaving group
      if (user?._id === selectedGroup?.admin._id) {
        // send an alert
        return;
      }
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/group/${selectedGroup?._id}/leave`,
        { userId: user?._id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
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
      `http://localhost:8080/api/v1/message/${selectedGroup?._id}/message`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    socket.emit("join group", selectedGroup?._id);
    setMessage(data);
  };

  useEffect(() => {
    // Get message related to the group
    getMessage();
    selectedChatCompare = selectedGroup?._id;
    console.log(selectedChatCompare);
  }, [selectedGroup]);

  useEffect(() => {
    socket.on("message received", (content: IMessage) => {
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
        width: 1 / 1,
        height: 1 / 1,
        position: "relative",
        overflowY: "auto",
      }}
    >
      <CssBaseline />

      {selectedGroup && (
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "space-between",
            height: { xs: "100vh", md: 1 / 1 },
            // height: { xs: "100vh", md: 1 / 1 },
            overflow: "auto",
          }}
        >
          <ChatHeader groupName={selectedGroup.name} leaveGroup={leaveGroup} />
          <Messages messages={message} />
          <ChatForm
            onSubmitHandler={submitHandler}
            onChangeHandler={changeHandler}
            content={newMessage ? newMessage.content : ""}
          />
        </Stack>
      )}
      {!selectedGroup && <ChatLobbie />}
    </Box>
  );
};

export default ChatDisplay;
