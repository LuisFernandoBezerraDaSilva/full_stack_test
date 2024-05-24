import { Express, Request, Response } from "express";
// import service from "../services/user-service";
import User from "../models/user"
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
      
          const results: { user: User}[] = [];
      
          fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {

              for (const newOne of results) {
                console.log('aaaaaaaaaaaa')
                console.log(newOne)
                await User.create(
                  {
                    ...newOne,
                  }
                );
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
          const query = req.query.q;
          const users = query ? await User.findByQuery(query) : await User.findAll();
          res.status(200).json(users);
        } catch (err: any) {
          res
            .status(err.status || 500)
            .json(err)
            .end();
        }
      });
};
