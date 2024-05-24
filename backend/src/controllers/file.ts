import { Express, Request, Response } from "express";
import service from "../services/file-service";
import {User} from "../interfaces/user"
import fs from 'fs';
import multer from 'multer';
import csv from 'csv-parser';

const upload = multer({ dest: 'uploads/' });

export default (app: Express) => {
      app.post("/files", upload.single('file'), async (req: Request, res: Response) => {
            
        try {
            if (!req.file) {
                res.status(400).send('No file uploaded.');
                return;
            }
      
          const results: User[] = [];

          fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
              for (let newOne of results) {
                console.log('aaaaaaaaaa')
                console.log(newOne)
                await service.create(newOne);
              }

              res.status(200).end();
            });
        } catch (err: any) {
            console.log('chegou aqui!3')

          res
            .status(err.status || 500)
            .json(err)
            .end();
        }
      });

      app.get("/users", async (req: Request, res: Response) => {
        try {
          const query = (req.query.q as string);
          const users = query ? await service.findByQuery(query) : await service.findAll();
          res.status(200).json(users);
        } catch (err: any) {
          res
            .status(err.status || 500)
            .json(err)
            .end();
        }
      });
};
