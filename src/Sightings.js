import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "./constants";

export default function Sightings() {
  const { sightingIndex } = useParams();
  const [sight, setSight] = useState("");

  useEffect(() => {
    const getData = async () => {
      console.log("data 1");
      const response = await fetch(`${BACKEND_URL}/sightings/${sightingIndex}`);
      const jsonData = await response.json();
      setSight(jsonData);
      console.log(jsonData);
    };

    getData();
  }, []);

  return (
    <header className="App-header">
      <Container>
        <h1>{sight.COUNTY}</h1>
        <h3>
          {sight.YEAR} {sight.MONTH}
        </h3>
        <p style={{ fontSize: "18px" }}>{sight.OBSERVED}</p>
      </Container>
    </header>
  );
}
