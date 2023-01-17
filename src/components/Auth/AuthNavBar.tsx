import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect } from 'react';

interface AuthNavBarProps {
  children?: React.ReactNode;
  setNewVal(index: number): void;
}

const AuthNavBar = (props: AuthNavBarProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    props.setNewVal(value);
  }, [value]);

  return (
    <Box
      sx={{
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon tabs example"
      >
        <Tab icon={<AppRegistrationIcon />} label="Sign Up" />
        <Tab icon={<LoginIcon />} label="Login" />
      </Tabs>
    </Box>
  );
};

export default AuthNavBar;
