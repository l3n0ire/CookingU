require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const processMessage = require('./process-message');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/chat', (req, res) => {
  const { message } = req.body;
  processMessage(message);
});

module.exports = app;
module.exports.handler = serverless(app);