import {
  addNewNote,
  getAllNotes,
  editNote,
  deleteNote,
} from '../controller/userController';
import { userSignUp } from '../controller/userAuth';
import express from 'express';
import { validateUserSchema } from '../middleware/user/validateUserSchema';

const router = express.Router();

/* Login Routes */
router.post('/signup', validateUserSchema, userSignUp);

/* Notes Routes */
router.get('/all-notes', getAllNotes);
router.post('/new-note', addNewNote);
router.patch('/edit-note/:id', editNote);
router.get('/delete-note/:id', deleteNote);

export default router;
