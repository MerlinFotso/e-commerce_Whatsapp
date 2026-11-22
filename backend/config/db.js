require('dotenv').config();
const { Pool, types } = require('pg');

// pg renvoie les NUMERIC sous forme de texte ("1500.00") : on les convertit en nombres
types.setTypeParser(1700, parseFloat);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;