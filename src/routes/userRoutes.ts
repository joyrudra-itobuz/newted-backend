import {
  addNewNote,
  getAllNotes,
  editNote,
  deleteNote,
} from "../controller/userController";
import express from "express";

const app = express();

app.get("/all-notes", getAllNotes);
app.post("/new-note", addNewNote);
app.patch("/edit-note/:id", editNote);
app.get("/delete-note/:id", deleteNote);

export default app;
