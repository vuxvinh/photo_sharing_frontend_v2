import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
//import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData"

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("https://zdw3q5-8081.csb.app/api/user/list")
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error loading user list: ", error);
      })
  }, [])

  return (
    <div className="user-list-container">
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItemButton
              components={Link}
              to={`/users/${user._id}`}
            >
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
              />
            </ListItemButton>
          </React.Fragment>
        ))}

      </List>
    </div>
  );
}



export default UserList;
