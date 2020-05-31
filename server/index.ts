import "reflect-metadata";
import 'dotenv/config';
import { createConnection } from "typeorm";
import express from "express";
import expressWs from 'express-ws';
import { saveMessage, getAllMessages } from './controller/MessageController'
import * as path from "path";
import * as fs from "fs";

import * as React from "react";
import * as ReactDOMServer  from "react-dom/server";
import { App } from '../front/App'

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


    app.get("/", (req, res) => {
        const indexFile = path.resolve(
            __dirname,
            "../front/index.html"
        );

        fs.readFile(indexFile, "utf8", (err, data) => {
            return res.send(data);
        });
    });



    app.use(router);
    app.use('/static', express.static( path.resolve(__dirname, '../dist')));

    // run app
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log(`Express application is up and running on port ${PORT}`);

}).catch(error => console.log("TypeORM connection error: ", error));
