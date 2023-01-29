import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface IChatProviderProps {
  children: React.ReactNode;
}

type ChatContent = {
  user: IUser | undefined;
  setUser: (u: IUser) => void;
  selectedGroup: IGroup | undefined;
  setSelectedGroup: (g: IGroup | undefined) => void;
  value: number;
  setValue: (v: number) => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  _id: string;
  token?: string;
}

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

const ChatContext = createContext<ChatContent>({
  user: undefined,
  setUser: () => {},
  selectedGroup: undefined,
  setSelectedGroup: () => {},
  value: 0,
  setValue: () => {},
  openModal: false,
  setOpenModal: () => {},
});

const ChatProvider = ({ children }: IChatProviderProps) => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<IGroup>();
  const [value, setValue] = useState(0);
  const [user, setUser] = useState<IUser>();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    try {
      const userInfo: IUser = JSON.parse(localStorage.getItem("user") || "");
      setUser(userInfo);
      setSelectedGroup(undefined);
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
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
