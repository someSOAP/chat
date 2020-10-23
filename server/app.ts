import ip from 'ip';
import express from "express";
import session from 'express-session';
import expressWs from 'express-ws';
import flash from 'express-flash';
import passport from 'passport';
import methodOverride from 'method-override';
import { saveMessage, getAllMessages } from './service/message.service';
import { findUserByID, findUserByUsername } from './service/user.service';
import * as path from "path";
import controller from './controller'
import initializePassport from "./auth";


const initExpressApp = () : void => {

    initializePassport(
        passport,
        findUserByUsername,
        findUserByID,
    );

    // create express app

    const appBase = express();
    const { app, getWss, applyTo } = expressWs(appBase);
    const wsRouter = express.Router() as expressWs.Router;
    app.use(wsRouter);
    app.use('/static', express.static( path.resolve(__dirname, '../dist')));
    app.use(flash());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(methodOverride('_method'));
    applyTo(express.Router());

    app.use(controller);

    app.ws('/chat', ws => {

        ws.on('message', async (msg) => {
            const res = await saveMessage(msg);
            getWss().clients.forEach(client => {
                client.send(JSON.stringify(res));
            });
        });
    });

    // run app
    const IP : string = ip.address();
    const PORT : string = process.env.PORT || "80";
    app.listen(PORT);
    console.log(`Chat available by link http://${IP}:${PORT} `);
};

export default initExpressApp;
