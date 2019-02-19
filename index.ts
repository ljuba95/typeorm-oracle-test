import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import RadnikRoutes from "./src/routes/RadnikRoutes";
import SektorRoutes from "./src/routes/SektorRoutes";
import cors from 'cors';

createConnection().then(async connection => {

    // create express app
    const app = express();
    // set middlewares
    app.use(bodyParser.json());
    app.use(cors());

    // add routers
    app.use("/radnik", RadnikRoutes);
    app.use("/sektor", SektorRoutes);
    
    // start express server
    app.listen(3000, () => console.log("Listening on 3000..."));

}).catch(error => console.log(error));