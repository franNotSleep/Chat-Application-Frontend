import AddIcon from '@mui/icons-material/Add';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Button, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ChatState } from '../../Context/ChatProvider';
import { IGroup } from '../Chat/ChatDisplay';
import DrawerWrapper from '../DrawerWrapper';
import StyledInput from '../StyledInput/StyledInput';
import ParticipantsField from './ParticipantsField';

interface ICreateGroupProps {
  open: boolean;
  handleClose(): void;
  onSubmitEffect: () => void;
}

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  _id: string;
  token?: string;
}

interface ICreateGroupData {
  participants: string[];
  name: string;
  admin?: string;
}

const CreateGroup = (props: ICreateGroupProps) => {
  const [input, setInput] = useState<ICreateGroupData>({
    participants: [],
    name: "",
    admin: "",
  });
  const { user, setSelectedGroup } = ChatState();

  const changeUserIdHandler = (
    e: React.SyntheticEvent<Element, Event>,
    users: IUser[]
  ) => {
    setInput({
      ...input,
      admin: user?._id,
      participants: [...users.map((user) => user._id)],
    });
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const newGroup = await axios.post<IGroup>(
        "http://localhost:8080/api/v1/group/",
        input,
        requestConfig
      );
      setSelectedGroup(newGroup.data);
      props.onSubmitEffect();
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  return (
    <DrawerWrapper>
      <Paper
        sx={{
          background: "#70C3FF",
          height: "100%",
        }}
        component="form"
        onSubmit={submitHandler}
      >
        <StyledInput
          icon={<Diversity3Icon sx={{ color: "#fff" }} />}
          placeholder="Group Name"
          changeHandler={(e) => {
            setInput({
              ...input,
              name: e.target.value,
            });
          }}
          value={input.name}
        />
        <ParticipantsField onChangeUserIdHandler={changeUserIdHandler} />
        <Button
          variant="contained"
          sx={{
            color: "#fff",
            alignSelf: "flex-end",
          }}
          type="submit"
          endIcon={<AddIcon />}
        >
          Create
        </Button>
      </Paper>
    </DrawerWrapper>
  );
};

export default CreateGroup;
