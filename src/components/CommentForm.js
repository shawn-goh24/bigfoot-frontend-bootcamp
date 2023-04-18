import { Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function CommentForm(props) {
  const [comment, setComment] = useState("");
  const { sightingIndex } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `http://localhost:8080/sightings/${sightingIndex}/comments`,
      {
        content: comment,
      }
    );

    // clear input
    setComment("");
    props.setComment(comment);
  };

  return (
    <div>
      <h4>Add comments here</h4>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ color: "white" }}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
