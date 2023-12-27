const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'myuser',
  host: 'postgres',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

app.get('/', (req, res) => {
  // Пример запроса к базе данных
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Internal Server Error');
    } else {
      const timestamp = result.rows[0].now;
      res.send(`Hello, World! Current timestamp from PostgreSQL: ${timestamp}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

