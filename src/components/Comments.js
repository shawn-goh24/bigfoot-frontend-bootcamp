import { List } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

export default function Comments(props) {
  const { sightingIndex } = useParams();
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState("");
  const [editedComment, setEditedComment] = useState(null);

  const getAPI = async () => {
    const comments = await axios.get(
      `http://localhost:8080/sightings/${sightingIndex}/comments`
    );
    console.log(comments.data);

    setComments(comments.data);
  };

  const handleDelete = async (content, commentId) => {
    await axios.delete(
      `http://localhost:8080/sightings/${sightingIndex}/comments/${commentId}`
    );
    console.log("delete", content, commentId);
    getAPI();
  };

  const handleEdit = async (content, commentId) => {
    await axios.put(
      `http://localhost:8080/sightings/${sightingIndex}/comments/${commentId}`,
      {
        content: editedComment,
      }
    );
    console.log("edit", content, commentId);
    setEditedComment(null);
    getAPI();
  };

  useEffect(() => {
    console.log("useeffect");
    getAPI();
  }, [comment]);

  return (
    <div>
      <CommentForm setComment={setComment} />
      <h2>Comments</h2>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {comments
          ? comments.map((comment) => {
              return (
                <Comment
                  comment={comment}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  editedComment={editedComment}
                  setEditedComment={setEditedComment}
                />
              );
            })
          : ""}
      </List>
    </div>
  );
}
