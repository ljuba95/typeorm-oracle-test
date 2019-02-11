import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import { Radnik } from "./src/entity/Radnik";


createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // test
    await connection.manager.save(connection.manager.create(Radnik, {
        firstName: "Pera",
        lastName: "Peric",
        age: 27
    }));
    await connection.manager.save(connection.manager.create(Radnik, {
        firstName: "Mika",
        lastName: "Mikic",
        age: 24
    }));

    const repos = getRepository(Radnik);
    const radnici = await repos.find();
    console.log(radnici);
}).catch(error => console.log(error));