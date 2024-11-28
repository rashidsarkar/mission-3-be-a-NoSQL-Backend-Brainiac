import express from 'express';
import { UserControler } from './user.controller';

const router = express.Router();

router.post('/create-student', UserControler.createUser);

export const userRoutes = router;
