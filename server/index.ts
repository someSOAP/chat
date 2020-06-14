import "reflect-metadata";
import 'dotenv/config';
import { createConnection } from "typeorm";
import ip from 'ip';
import express from "express";
import expressWs from 'express-ws';
import { saveMessage, getAllMessages } from './controller/MessageController'
import * as path from "path";
import * as fs from "fs";
import { createPageRoute } from './controller'

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


    app.get("/", createPageRoute('chat'));

    app.get("/login", createPageRoute('login'));
    app.post("/login", (req, res)=>{
        console.log(req);
        console.log(res);
    });

    app.use(router);
    app.use('/static', express.static( path.resolve(__dirname, '../dist')));

    // run app
    const IP = ip.address();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log(`Chat available by link http://${IP}:${PORT} `);

}).catch(error => console.log("TypeORM connection error: ", error));
