import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Avatar, Checkbox, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { ChatState, IGroup, IUser } from '../../Context/ChatProvider';
import StyledInputAutocomplete from '../StyledInput/StyledInputAutocomplete';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface ParticipantsFieldProps {
  // onChangeUserIdHandler(
  //   e: React.SyntheticEvent<Element, Event>,
  //   value: IUser[]
  // ): void;
  changeAutocompleteHandler?:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: Array<IGroup | IUser> | IUser | IGroup | null
      ) => void)
    | undefined;
  multipleSelect?: boolean;
}

interface IUserResponse {
  users: IUser[];
}

/**
 * @desc Make an API request to the server and get back all users according to the user input
 * @params onChangeUserIdHandler(e: React.SyntheticEvent<Element, Event>, users:IUser[]): void;
 * @params token: string
 */
const ParticipantsField = (props: ParticipantsFieldProps) => {
  const { user } = ChatState();
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
        Authorization: `Bearer ${user?.token}`,
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
    <StyledInputAutocomplete
      placeholder="participants"
      value={input}
      getOptionLabel={(user) => user.name}
      changeHandler={(e) => {
        setInput(e.target.value);
      }}
      changeAutocompleteHandler={props.changeAutocompleteHandler}
      options={users}
      icon={<AddIcon sx={{ color: "#fff" }} />}
      multipleSelect={true}
      renderOption={(props, option, { selected }) => (
        <li
          {...props}
          style={{
            background: "#70C3FF",
          }}
        >
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          <List sx={{ width: "100%" }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={"avatar" in option ? option.avatar : ""} />
              </ListItemAvatar>
              <ListItemText primary={option.name} secondary={option._id} />
            </ListItem>
          </List>
        </li>
      )}
    />
  );
};

export default ParticipantsField;
