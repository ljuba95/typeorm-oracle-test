import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Radnik } from "../entity/Radnik";
import { Sektor } from "../entity/Sektor";

const router = Router();

//get all
router.get("/", async (req: Request, res: Response) => {
    try {
        res.json(await getRepository(Radnik).find());
    } catch(e) {
        res.json({error: e.message});
    }
});

//get by id
router.get("/:id", async (req: Request, res: Response) => {
    try{
        let radnik = await getRepository(Radnik).findOne(req.params.id);
        if(radnik){
            res.json(radnik);
        }else {
            res.json({error: `Radnik id ${req.params.id} ne postoji.`});
        }
    } catch (e) {
        res.json({error: e.message});
    }
});

//delete by id
router.delete("/:id", async (req: Request, res: Response) => {
    try{
        let radnik = await getRepository(Radnik).findOne(req.params.id);
        if(radnik){
            await getRepository(Radnik).delete(req.params.id);
            res.sendStatus(200);
        }else {
            res.json({error: `Radnik id ${req.params.id} ne postoji.`});
        }
    } catch(e) {
        res.json({error: e.message});
    }
});

//insert one
router.post("/", async (req: Request, res: Response) => {
    try{
        //format datuma YYYY-MM-DD
        let sektor = await getRepository(Sektor).findOne(req.body.sektor);
        if(!sektor) {
            res.json({error: `Sektor id ${req.body.sektor} ne postoji.`});
            return;
        }
        await getRepository(Radnik).insert({...req.body, sektor});
        res.sendStatus(201); //201 Created
    } catch(e) {
        res.json({error: e.message});
    }
});

//update one
router.patch("/:id", async (req: Request, res: Response) => {
    try{
        await getRepository(Radnik).update(req.params.id, req.body);
        let radnik = await getRepository(Radnik).findOne(req.params.id)
        if(radnik){
            res.json(radnik);
        }else{
            res.json({error: `Radnik id ${req.params.id} ne postoji.`});
        }
    } catch(e) {
        res.json({error: e.message});
    }
});

export default router;