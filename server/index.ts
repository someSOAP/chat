import "reflect-metadata";
import 'dotenv/config';
import { createConnection } from "typeorm";
import ip from 'ip';
import express from "express";
import session from 'express-session';
import expressWs from 'express-ws';
import flash from 'express-flash';
import passport from 'passport';
import methodOverride from 'method-override';
import { saveMessage, getAllMessages } from './controller/MessageController'
import { createUser, findUserByID, findUserByUsername } from './controller/UserController'
import * as path from "path";
import { createPageRoute } from './controller/index'
import initialize, { checkAuthenticated, checkNotAuthenticated, logout } from "./auth";



createConnection().then(async () => {

    initialize(
        passport,
        findUserByUsername,
        findUserByID,
    );

    // create express app
    const { app, getWss, applyTo } = expressWs(express());
    const router = express.Router() as expressWs.Router;
    app.use(router);
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

    app.get("/", checkAuthenticated, createPageRoute('chat'));

    app.get("/login", checkNotAuthenticated, createPageRoute('login'));
    app.post("/login", passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }));

    app.get("/register", checkNotAuthenticated, createPageRoute('register'));
    app.post("/register", checkNotAuthenticated, async (req, res) => {
        try {
            const { username, password } = req.body;
            await createUser(username , password);
            res.redirect('/login');
        } catch (e) {
            console.error(e);
            res.redirect('/register');
        }
    });

    // run app
    const IP = ip.address();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log(`Chat available by link http://${IP}:${PORT} `);

}).catch(error => console.log("TypeORM connection error: ", error));
