import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface IChatProviderProps {
  children: React.ReactNode;
}

type ChatContent = {
  user: IUser | undefined;
  setUser: (u: IUser) => void;
  selectedGroup: IGroup | undefined;
  setSelectedGroup: (g: IGroup | undefined) => void;
  value: ComponentValue;
  setValue: (v: ComponentValue) => void;
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
  randomQuote: RandomQuote | undefined;
  setMyGroups: (groups: IGroup[]) => void;
  myGroups: IGroup[];
  setMyFilteredGroups: (groups: IGroup[]) => void;
  myFilteredGroups: IGroup[];
};

type RandomQuote = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
};

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  _id: string;
  token?: string;
  aboutMe?: string;
}

export interface IUserArray {
  kind: "user";
  users: IUser[];
}

export interface IGroup {
  _id: string;
  name: string;
  admin: {
    name: string;
    _id: string;
    avatar?: string;
  };
  pic?: string;
  participants: IUser[];
  createdAt?: Date | string;
  updatedAt?: string;
}

const ChatContext = createContext<ChatContent>({
  user: undefined,
  setUser: () => {},
  selectedGroup: undefined,
  setSelectedGroup: () => {},
  value: 0,
  setValue: () => {},
  openDrawer: false,
  setOpenDrawer: () => {},
  randomQuote: undefined,
  setMyGroups: () => {},
  myGroups: [],
  setMyFilteredGroups: () => {},
  myFilteredGroups: [],
});

export interface IGroupResponse {
  group: IGroup[];
}

export type ComponentValue = 0 | 1 | 2 | 3 | 4 | 5 | null;

const ChatProvider = ({ children }: IChatProviderProps) => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<IGroup>();
  const [value, setValue] = useState<ComponentValue>(3);
  const [user, setUser] = useState<IUser>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [randomQuote, setRandomQuote] = useState<RandomQuote>();
  const [myGroups, setMyGroups] = useState<IGroup[]>([]);
  const [myFilteredGroups, setMyFilteredGroups] = useState<IGroup[]>(myGroups);

  const generateRandomQuote = async () => {
    const { data } = await axios.get<RandomQuote>(
      "https://api.quotable.io/random"
    );
    setRandomQuote(data);
  };

  useEffect(() => {
    try {
      const userInfo: IUser = JSON.parse(localStorage.getItem("user") || "");
      setUser(userInfo);
      setSelectedGroup(undefined);
      generateRandomQuote();
    } catch (err) {
      setUser(undefined);
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedGroup,
        setSelectedGroup,
        value,
        setValue,
        openDrawer,
        setOpenDrawer,
        randomQuote,
        setMyGroups,
        myGroups,
        setMyFilteredGroups,
        myFilteredGroups,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
