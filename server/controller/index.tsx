import * as path from "path";
import * as fs from "fs";
import { Request, Response } from 'express'

export const createPageRoute = (pageName : string) => (req : Request, res : Response) : void => {
    const indexFile = path.resolve(
        __dirname,
        "../../front/index.html"
    );

    fs.readFile(indexFile, "utf8", (err, data) => {
        return res.send(
            data.replace(
                '<!--script-->',
                `<script src="./static/${pageName}.js"></script>`
            )
        );
    });
};



