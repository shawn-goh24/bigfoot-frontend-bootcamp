import { Button, Container, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "./constants";
import EditIcon from "@mui/icons-material/Edit";
import Comments from "./components/Comments";

export default function Sightings() {
  const { sightingIndex } = useParams();
  const [sight, setSight] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${BACKEND_URL}/sightings/${sightingIndex}`);
      const jsonData = await response.json();
      setSight(jsonData);
      console.log(jsonData);
    };

    getData();
  }, []);

  const editSighting = () => {
    navigate(`/sightings/${sightingIndex}/edit`);
  };

  return (
    <header className="App-header">
      <IconButton onClick={editSighting}>
        <EditIcon sx={{ color: "grey" }} />
      </IconButton>
      <Container>
        <h1>{sight.country}</h1>
        <h2>{sight.city}</h2>
        <h3>{sight.location_description}</h3>
        <h3>{new Date(sight.date).toLocaleDateString()}</h3>
        <p style={{ fontSize: "18px" }}>{sight.notes}</p>
      </Container>
      <Button onClick={() => navigate("/sightings")}>Back to homepage</Button>
      <Comments />
    </header>
  );
}
