import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();

  const getContextText = () => {
    const path = location.pathname;

    if (path.startsWith('/users/') && !path.includes('photo')) {
      const userId = path.split('/')[2];
      const user = models.userModel(userId);
      if (user) {
        return `${user.first_name} ${user.last_name}`;
      }
    }
    else if (path.startsWith('/photos/')) {
      const userId = path.split('/')[2];
      const user = models.userModel(userId);
      if (user) {
        return `Photos of ${user.first_name} ${user.last_name}`;
      }
    }

    return 'Home';
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h5" color="inherit">
          Vu Vinh
        </Typography>
        <Typography variant="h5" color="inherit">
          {getContextText()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
