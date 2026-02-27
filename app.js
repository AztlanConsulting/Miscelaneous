const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const getData = require('./utils/data');

// Loads the variables in the enviorment file
require('dotenv').config();

// Allows to read x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allows to read JSON's
app.use(bodyParser.json());

// Handles incoming docusaurus requests
const docusaurusRouter = require('./routes/docusaurus.routes')
app.use('/docusaurus', docusaurusRouter);

// TODO: Develop the discord messages module

// Handles routes that weren't found
app.use((request, response) => {
    response.status(404).json({message: 'The given route doesn\'t exist.'});
});

app.listen(3000);