const express = require("express");
const app = express();
const notes = require("./data/notes-data");

app.use(express.json());


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

app.get("/notes/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  const note = notes.find((note) => note.id === Number(noteId));

  if (note) {
    res.json({ data: note });
  } else {
    res.status(404).send(`Note id not found: ${noteId}`);
  }
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});



module.exports = app;
