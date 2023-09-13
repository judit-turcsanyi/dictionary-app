const express = require('express');
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 3001;
var config = require('./config.json');

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(204).json({});
    }
    next();
  });

const client = new Client({
    host: 'dict-db.cyfoprg6662b.eu-north-1.rds.amazonaws.com',
    port: 5432,
    database: 'postgres',
    user: config.username,
    password: config.password,
    ssl: {
      rejectUnauthorized: false
    }
  });

  client.connect()
        .then(() => console.log("Connected successfully!"))
        .catch(e => console.log(e))

// Add new pairs
app.post('/add/:source/:target', (req, res) => {
    const { source, target } = req.params;
    
    client.query('INSERT INTO words (source,target) VALUES(\'' + source + '\',\'' + target + '\') RETURNING *', (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        res.json(result.rows);
      });

});

// Add new pairs, user, language
app.post('/add/:source/:target/:userid/:lang', (req, res) => {
    const { source, target, userid, lang } = req.params;
    
    client.query('INSERT INTO words (source,target,userid,lang) VALUES(\'' + source + '\',\'' + target + '\',\'' + userid + '\',\'' + lang + '\') RETURNING *', (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        res.json(result.rows);
      });

});

// Get value by key
app.get('/get/:key', (req, res) => {
    const { key } = req.params;

    client.query('SELECT * FROM words WHERE id=' + key + ';', (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        res.json(result.rows);
      });
});

// Get full list
app.get('/list', (req, res) => {
    client.query('SELECT * FROM words;', (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        res.json(result.rows);
      });
});

// Delete word pair
app.delete('/delete/:key', (req, res) => {
    const { key } = req.params;

    client.query('DELETE FROM words WHERE id=' + key + ';', (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        res.json(result.rows);
      });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});