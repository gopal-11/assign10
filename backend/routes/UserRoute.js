// backend/routes/UserRoutes.js

import express from 'express';
import { addUser, getUsers } from '../controllers/UserController.js';

const router = express.Router();

// get router to fetch users
router.get('/users', getUsers);
// post router to add subordinate
router.post('/users', addUser);

export default router;
