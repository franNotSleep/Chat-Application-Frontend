import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Box, Checkbox, Fab, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { IGroup } from '../Chat/ChatDisplay';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ICreateGroupProps {
  open: boolean;
  onGetGroup: (_group: IGroup) => void;
  handleClose(): void;
  onSubmitEffect: () => void;
}

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  _id: string;
}

interface IUserResponse {
  users: IUser[];
}

interface ICreateGroupData {
  participants: string[];
  name: string;
  admin: string;
}

const CreateGroup = (props: ICreateGroupProps) => {
  const navigate = useNavigate();
  const [input, setInput] = useState<ICreateGroupData>({
    participants: [],
    name: "",
    admin: "",
  });

  let adminId: string;
  let token!: string;

  // If not token, go back to the form component
  try {
    if (JSON.parse(localStorage.getItem("user") || "").token) {
      token = JSON.parse(localStorage.getItem("user") || "").token;
      adminId = JSON.parse(localStorage.getItem("user") || "")._id;
    } else {
      navigate("/");
    }
  } catch (err) {
    navigate("/");
  }

  const changeUserIdHandler = (
    e: React.SyntheticEvent<Element, Event>,
    users: IUser[]
  ) => {
    setInput({
      ...input,
      admin: adminId,
      participants: [...users.map((user) => user._id)],
    });
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Creating group
    console.log(input);
    try {
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const newGroup = await axios.post<IGroup>(
        "http://localhost:8080/api/v1/group/",
        input,
        requestConfig
      );
      props.onGetGroup(newGroup.data);
      props.onSubmitEffect();
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    if (typeof localStorage.getItem("user") === "object") {
      navigate("/");
      return;
    }
    if (JSON.parse(localStorage.getItem("user") || "")._id) {
      adminId = JSON.parse(localStorage.getItem("user") || "")._id;
    } else {
      navigate("/");
    }
  });

  return (
    <div>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style} component="form" onSubmit={submitHandler}>
          <Typography variant="h6" component="h2">
            Create Modal
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            label="Group Name"
            onChange={(e) => {
              setInput({
                ...input,
                name: e.target.value,
              });
            }}
          />
          <ParticipantsField
            onChangeUserIdHandler={changeUserIdHandler}
            token={token}
          />
          <Fab color="primary" type="submit" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
      </Modal>
    </div>
  );
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface ParticipantsFieldProps {
  onChangeUserIdHandler(
    e: React.SyntheticEvent<Element, Event>,
    users: IUser[]
  ): void;
  token: string;
}

/**
 * @desc Make an API request to the server and get back all users according to the user input
 * @params onChangeUserIdHandler(e: React.SyntheticEvent<Element, Event>, users:IUser[]): void;
 * @params token: string
 */
const ParticipantsField = (props: ParticipantsFieldProps) => {
  const [users, setUsers] = useState([
    {
      name: "",
      email: "",
      avatar: "",
      _id: "",
    },
  ]);
  const [input, setInput] = useState("");

  // Get all the users that match userInput
  const getUsers = async (userInput: string) => {
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    };
    try {
      const { data } = await axios.get<IUserResponse>(
        `http://localhost:8080/api/v1/user?search=${userInput}`,
        requestConfig
      );
      setUsers(data.users);
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getUsers(input);
  }, [input]);

  return (
    <Autocomplete
      multiple
      options={users}
      disableCloseOnSelect
      isOptionEqualToValue={(option, value) => option._id === value._id}
      onChange={props.onChangeUserIdHandler}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Participants"
          placeholder="Participants"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      )}
    />
  );
};

export default CreateGroup;
