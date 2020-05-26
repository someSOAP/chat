import "reflect-metadata";
import 'dotenv/config';
// import cors from "cors";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import { AppRoutes } from "./routes";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async connection => {

    // create express app
    const app = express();
    // app.use(cors());
    app.use(bodyParser.json());

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log(`Express application is up and running on port ${PORT}`);

}).catch(error => console.log("TypeORM connection error: ", error));
