import { UserController } from '../controller/userController';
import express from 'express';
import { validateUserSchema } from '../middleware/user/validateUserSchema';
import { checkExistingUser } from '../middleware/user/checkExistingUser';

const router = express.Router();

const userController = new UserController();

/* Login Routes */
router.post(
  '/signup',
  [validateUserSchema, checkExistingUser],
  userController.userSignUp
);
router.post(
  '/signin',
  [validateUserSchema, checkExistingUser],
  userController.userSignIn
);
router.get('/verify-user/:token', userController.verifyUser);

/* Notes Routes */
router.get('/all-notes', userController.getAllNotes);
router.post('/new-note', userController.addNewNote);
router.patch('/edit-note/:id', userController.editNote);
router.get('/delete-note/:id', userController.deleteNote);

export default router;
