import { addNewNote, getAllNotes } from "../controller/userController";
import express from "express";

const app = express();

app.get("/all-notes", getAllNotes);
app.post("/new-note", addNewNote);

export default app;
