const path = require('path');
const sqlite3 = require('sqlite3');
const dbFile = path.join(__dirname, 'data', 'database.sqlite');
const fs = require('fs');


if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));


const db = new sqlite3.Database(dbFile);


module.exports = db;