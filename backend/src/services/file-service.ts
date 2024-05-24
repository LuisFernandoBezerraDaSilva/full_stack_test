import sqlite3 from 'sqlite3';
import {User} from "../interfaces/user"

let db = new sqlite3.Database('./db.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

export default {

    async findAll() {
        return new Promise((resolve, reject) => {
          db.all('SELECT * FROM users', [], (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows);
          });
        });
    },

    async create(params: User) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO users (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)`;
            db.run(sql, [params.name, params.city, params.country, params.favorite_sport], function(this: sqlite3.RunResult, err: Error | null) {
            if (err) {
                reject(err);
            }
            resolve({ message: "User successfully created", user: params });
            });
        });
    },
    
    async findByQuery(q: string) {
        return new Promise((resolve, reject) => {
          const sql = `SELECT * FROM users WHERE name LIKE ? OR city LIKE ? OR country LIKE ? OR favorite_sport LIKE ?`;
          db.all(sql, [`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`], (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows);
          });
        });
      },  
};
