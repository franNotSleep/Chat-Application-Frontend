import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';

import AccountMenu from './AccountMenu';
import BasicMenu from './BasicMenu';
import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={8}
        sx={{
          background: "linear-gradient(to top, #2193b0, #6dd5ed)",
        }}
      >
        <Toolbar>
          <BasicMenu />
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#fff", display: { xs: "none", sm: "block" } }}
          >
            CHARAP
          </Typography>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon sx={{ color: "#fff" }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon sx={{ color: "#fff" }} />
              </Badge>
            </IconButton>
          </Box>
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
