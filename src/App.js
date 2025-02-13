import React from "react";
import "./App.css";
import Sightings from "./Sightings";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Form from "./components/Form";
import EditForm from "./components/EditForm";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sightings">
          <Route index element={<Home />} />
          <Route path=":sightingIndex" element={<Sightings />} />
          <Route path=":sightingIndex/edit" element={<EditForm />} />
          <Route path="new" element={<Form />} />
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
}
