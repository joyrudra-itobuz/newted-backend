import {
  addNewNote,
  getAllNotes,
  editNote,
} from "../controller/userController";
import express from "express";

const app = express();

app.get("/all-notes", getAllNotes);
app.post("/new-note", addNewNote);
app.patch("/edit-note", editNote);

export default app;
