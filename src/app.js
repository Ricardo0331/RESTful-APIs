const express = require("express");
const app = express();

const notes = require("./data/notes-data");

app.post("/notes", (req, res) => {
  //validate incoming request
  const { data = {} } = req.body;
  const { text } = data;

  if (!text) {
    return res.status(400).send("The text property is missing or empty");
  }

  //generate new ID for the note
  const newId = Math.max(...notes.map((note) => note.id), 0) + 1;

  //create new note
  const newNote = {
    id: newId,
    text,
  };

  //store new note
  notes.push(newNote);

  //return the new note with a 201 status code
  res.status(201).json({ data : newNote});
});



module.exports = app;
