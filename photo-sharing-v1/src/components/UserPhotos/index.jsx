import React, { useEffect, useState } from "react";
import { Typography, Divider, Card, CardMedia, CardContent } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`https://zdw3q5-8081.csb.app/api/photo/photosOfUser/${userId}`)
      .then((data) => {
        console.log('Photos data:', data); // Debug log
        setPhotos(data);
      })
      .catch((error) => {
        console.error("Error loading photos: ", error);
      });
  }, [userId]);

  if (!photos || photos.length === 0) {
    return <Typography variant="h6">No photos found</Typography>;
  }

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Photos
      </Typography>
      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "20px" }}>
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}  // Thay vì http://localhost:8081/api/images/
            alt="User photo"
            style={{ maxHeight: "500px", objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="caption" color="textSecondary" gutterBottom>
              {formatDateTime(photo.date_time)}
            </Typography>

            <Divider style={{ margin: "15px 0" }} />

            <Typography variant="subtitle2" gutterBottom>
              Comments:
            </Typography>

            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment) => (
                <div key={comment._id} style={{ marginBottom: "15px", paddingLeft: "10px", borderLeft: "3px solid #e0e0e0" }}>
                  <Typography variant="body2">
                    <Link
                      to={`/users/${comment.user._id}`}
                      style={{ textDecoration: 'none', fontWeight: 'bold', color: '#1976d2' }}
                    >
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                    {' - '}
                    <span style={{ fontSize: '0.85em', color: '#666' }}>
                      {formatDateTime(comment.date_time)}
                    </span>
                  </Typography>
                  <Typography variant="body1" style={{ marginTop: "5px" }}>
                    {comment.comment}
                  </Typography>
                </div>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No comments yet
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;