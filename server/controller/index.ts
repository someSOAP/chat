import { Router } from 'express';

import auth from './auth.controller';
import chat from './chat.controller';
import {checkAuthenticated} from "../auth";
import {createPageRoute} from "../service";


const router : Router = Router();

router.use('/auth', auth);
router.use('/chat', chat);

router.get("/", checkAuthenticated, createPageRoute('chat'));

export default router;
