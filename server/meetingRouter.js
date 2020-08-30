const express = require('express');
const meetingsRouter = express.Router();
const db = require('./db.js');
const bodyParser = require('body-parser');

meetingsRouter.use(bodyParser.json());

meetingsRouter.get('/', (req, res, next) => {
    console.log('get all meetings');
    let meetings = db.getAllFromDatabase('meetings');
    res.status(200).send(meetings)
})

meetingsRouter.post('/', (req, res, next) => {
    console.log('post meetings');
    db.addToDatabase('meetings', req.body);
    res.status(201).send('Yours meetin is successful created!')
})

module.exports = meetingsRouter;