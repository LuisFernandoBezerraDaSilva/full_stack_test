import sqlite3 from 'sqlite3';
import User from "../models/user"
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../../../db/database.sqlite'
});

sequelize.authenticate()
  .then(() => console.log('Conexion stablished successfully.'))
  .catch((err: any) => console.error('Couldnt connect to the database:', err));

module.exports = sequelize;

let db = new sqlite3.Database('./db.sqlite', sqlite3.OPEN_READONLY, (err) => {
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
            db.run(sql, [params.name, params.city, params.country, params.favorite_sport], function(err) {
            if (err) {
                reject(err);
            }
            resolve({ id: this.lastID, ...params });
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
