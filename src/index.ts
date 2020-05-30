import "reflect-metadata";
import 'dotenv/config';
import { createConnection } from "typeorm";
import express from "express";
import expressWs from 'express-ws';
import { saveMessage, getAllMessages } from './controller/MessageSaveAction'

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async () => {

    // create express app
    const { app, getWss, applyTo } = expressWs(express());

    applyTo(express.Router());

    getWss().clients.forEach(ws => {
        if (ws.readyState !== ws.OPEN) {
            ws.terminate();
            return;
        }
        ws.ping();
    });

    app.ws('/chat', ws => {
        ws.on('message', async (msg) => {
            const res = await saveMessage(msg);
            getWss().clients.forEach(client => {
                client.send(JSON.stringify(res));
            });
        });
    });

    app.get('/messages', async (req, res, ) => {
        const messages = await getAllMessages();
        res.send(messages);
    });

    const router = express.Router() as expressWs.Router;

    router.ws(
        '/:id',
        (ws, req, next) => { next(); },
        (ws, req) => {
            ws.send(req.params.id);

            ws.on('close', (code, reason) => {
                console.log('code:', code);
                console.log('reason:', reason);
            });
        }
    );

    app.use(router);

    // run app
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log(`Express application is up and running on port ${PORT}`);

}).catch(error => console.log("TypeORM connection error: ", error));
