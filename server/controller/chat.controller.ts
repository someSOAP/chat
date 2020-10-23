import { Router } from 'express'

import { checkAuthenticated } from "../auth";
import { getAllMessages } from "../service/message.service";

const router : Router = Router();

router.get('/messages', checkAuthenticated, async (req, res, ) => {
    const messages = await getAllMessages();
    res.send(messages);
});


export default router;
