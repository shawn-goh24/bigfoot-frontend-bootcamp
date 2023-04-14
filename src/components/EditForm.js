import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditForm(props) {
  const { sightingIndex } = useParams();
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getRequest = async () => {
      let response = await fetch(
        `http://localhost:8080/sightings/${sightingIndex}`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      const date = new Date(jsonData.date);
      setDate(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`
      );
      setCountry(jsonData.country);
      setCity(jsonData.city);
      setLocationDescription(jsonData.location_description);
      setNotes(jsonData.notes);
    };

    getRequest();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let request = await fetch(
      `http://localhost:8080/sightings/${sightingIndex}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          country: country,
          city: city,
          location_description: locationDescription,
          notes: notes,
        }),
      }
    );

    console.log(request);

    // clear inputs
    setDate("");
    setCountry("");
    setCity("");
    setLocationDescription("");
    setNotes("");

    // return back to sighting page after submit
    navigate(`/sightings/${sightingIndex}`);
  };

  return (
    <header className="App-header">
      <h1>Edit Sighting</h1>
      <form onSubmit={handleSubmit}>
        <label>Country: </label>
        <Input
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          sx={{ color: "white" }}
          required
        />
        <br />
        <label>City: </label>
        <Input
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ color: "white" }}
          required
        />
        <br />
        <label>Location Description: </label>
        <Input
          type="text"
          name="location_description"
          value={locationDescription}
          onChange={(e) => setLocationDescription(e.target.value)}
          sx={{ color: "white" }}
          required
        />
        <br />
        <label>Date: </label>
        <Input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ color: "white" }}
          required
        />
        <br />
        <label>Note: </label>
        <Input
          type="text"
          name="note"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{ color: "white" }}
          required
        />
        <br />
        <input type="submit" value="submit" />
      </form>
      <br />
      <Button onClick={() => navigate("/sightings")}>Back</Button>
    </header>
  );
}
