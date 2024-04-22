require('dotenv').config();
const express = require('express');
const router = require('express').Router();
const app = express();
const PORT = process.env.PORT;
const bodyparser = require('body-parser')

router.use(bodyparser.json());

app.listen(PORT, (req, res) => {
  console.log(`listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send(`<h1>Hello!</h1>`)
});

app.use('/auth', require('./auth/index.js'));
app.use('/api', require('./api/index.js'));