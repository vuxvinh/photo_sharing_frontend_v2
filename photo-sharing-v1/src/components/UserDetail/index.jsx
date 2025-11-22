import React, { useEffect, useState } from "react";
import { Typography, Button, Card, CardContent } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import models from "../../lib/fetchModelData";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchModel(`https://zdw3q5-8081.csb.app/api/user/${userId}`)
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Error loading user detail:", error);
            });
    }, [userId]);

    if (!user) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    {user.first_name} {user.last_name}
                </Typography>
                <Typography color="textSecondary">
                    Location: {user.location}
                </Typography>
                <Typography color="textSecondary">
                    Description: {user.description}
                </Typography>
                <Typography color="textSecondary">
                    Occupation: {user.occupation}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/photos/${userId}`}
                >
                    View Photos
                </Button>
            </CardContent>
        </Card>
    );
}

export default UserDetail;
