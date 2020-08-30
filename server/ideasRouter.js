const express = require('express');
const ideasRouter = express.Router();
let db = require('./db');
let ideas = db.getAllFromDatabase('ideas');
let bodyParser = require('body-parser');
let checkMillionDollaridea = require('./checkMillionDollaridea.js');

ideasRouter.use(bodyParser.json());
ideasRouter.param('ideaId', (req, res, next, id) => {
    if (!id) {
        console.log('ideaId not exist,pls eneter a ideaId!')
    }
    req.ideaId = id;
    next();
})



ideasRouter.get('/', (req, res, next) => {
    console.log('get all ideas');
    res.status(200).send(ideas);
})

ideasRouter.post('/', (req, res, next) => {
    console.log('post method used')
    let million = checkMillionDollaridea(req.body);
    let newIdea = req.body;
    console.log(newIdea);
    db.addToDatabase('ideas', req.body);
    res.status(201).send(`New ides was successful created! And ${million}`)
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    console.log('get by id');
    console.log(req.ideaId)
    let ideasById = db.getFromDatabaseById('ideas', req.ideaId);
    res.status(200).send(ideasById);
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    let million = checkMillionDollaridea(req.body);
    let ideaForUpdate = req.body;
    ideaForUpdate.id = req.ideaId;
    db.updateInstanceInDatabase('ideas', ideaForUpdate);
    res.status(200).send(`Yours idea was successful updated And ${million}!`)
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    console.log('delete by Id')
    db.deleteFromDatabasebyId('ideas', req.ideaId);
    res.status(204).send()
})






module.exports = ideasRouter;