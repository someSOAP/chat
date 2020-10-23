import "reflect-metadata";
import 'dotenv/config';
import { createConnection } from "typeorm";
import initExpressApp from "./app";


createConnection()
    .then(initExpressApp)
    .catch(error => console.log("TypeORM connection error: ", error));
