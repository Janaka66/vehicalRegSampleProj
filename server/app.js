'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

const defaultRouts = require("./routes/default");

app.use(cors());

//Expect a JSON body
app.use(bodyParser.json({
  limit: '50mb'                   //Request size - 50MB
}));

//Version
app.use('/ver', (req, res) => {
  res.status(200).send('0.1.4');
});

app.use('/vm', defaultRouts);

app.use((req, res) => {
  res.status(404).send('page not found')
})

module.exports = app;

